const SquareConnect = require('square-connect');
const { getConnection, parseInsertValues, insertIntoTable } = require('../utils/db-helpers');
const { hashIt } = require('../utils/hash-it');

const { SQUARE_ACCESS_TOKEN, SQUARE_HOST } = process.env;

const getClient = () => {
  const client = SquareConnect.ApiClient.instance;
  client.basePath = SQUARE_HOST;
  client.authentications.oauth2.accessToken = SQUARE_ACCESS_TOKEN;
  return client;
};

const addToAddresses = async (conn, values) => {
  return insertIntoTable(conn, 'addresses', values);
};

const addToUsers = async (conn, values) => {
  const existingUser = await conn.query(`SELECT * FROM users WHERE email=?`, values.email);
  if (existingUser) {
    return {
      error: 'Unable to add to users table',
      message: `User already exists with email ${values.email}`,
    };
  }
  const insertValues = await parseInsertValues(conn, 'users', { ...values, userRolesId: 2 });
  const row = {
    ...insertValues,
    password: hashIt(insertValues.password),
  };
  return insertIntoTable(conn, 'users', row);
};

const addToSubscriptions = async (conn, values) => {
  return insertIntoTable(conn, 'subscriptions', values);
};

const addToOrders = async (conn, values) => {
  return insertIntoTable(conn, 'orders', values);
};

/**
 * take form values + card nonce
 * create square customer
 * link customer + card
 * update db
 *   - create address
 *   - create user + link address
 *   - create subscription + link user
 * return errors to UI
 */
const controller = async (req, res) => {
  const values = req.body;
  const conn = await getConnection();
  const api = new SquareConnect.CustomersApi(getClient());

  try {
    const { customer } = await api.createCustomer({
      given_name: values.firstName,
      family_name: values.lastName,
      email_address: values.email,
      phone_number: null,
      address: {
        address_line_1: values.address,
        address_line_2: values.address2,
        locality: values.city,
        postal_code: values.cardData.billing_postal_code,
        administrative_district_level_1: values.state,
        country: 'US',
      },
    });

    const cardRequest = {
      card_nonce: values.nonce,
      billing_address: customer.address,
      cardholder_name: values.cardholderName,
    };

    const { card } = await api.createCustomerCard(customer.id, cardRequest);

    const insertedAddress = await addToAddresses(conn, values);
    const insertedUser = await addToUsers(conn, {
      ...values,
      addressesId: insertedAddress.id,
      paymentCustomerId: customer.id,
    });
    const insertedSubscription = await addToSubscriptions(conn, {
      ...values,
      usersId: insertedUser.id,
      isActive: true,
    });
    const insertedOrder = await addToOrders(conn, {
      ...values,
      subscriptionsId: insertedSubscription.id,
    });

    res.send({
      data: {
        address: insertedAddress,
        user: insertedUser,
        subscription: insertedSubscription,
        order: insertedOrder,
        card,
      },
    });
  } catch (err) {
    conn.rollback();
    res.status(400).send({
      error: err,
      message: 'Unable to process subscription',
    });
  }
  conn.end();
};

module.exports = { controller };
