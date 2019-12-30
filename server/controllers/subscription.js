const SquareConnect = require('square-connect');
const { getConnection } = require('../utils/db-helpers');
const { parseError } = require('../utils/api-helpers');

const { SQUARE_ACCESS_TOKEN, SQUARE_HOST } = process.env;

const getClient = () => {
  const client = SquareConnect.ApiClient.instance;
  client.basePath = SQUARE_HOST;
  client.authentications.oauth2.accessToken = SQUARE_ACCESS_TOKEN;
  return client;
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
        postal_code: values.cardDetails.postal_code,
        administrative_district_level_1: values.state,
        country: 'US',
      },
    });

    const cardRequest = {
      card_nonce: values.card_nonce,
      billing_address: customer.address,
      cardholder_name: values.cardholderName,
    };

    const { card } = await api.createCustomerCard(customer.id, cardRequest);

    res.send({
      data: req.body,
    });
  } catch (err) {
    res.status(400).send({
      error: 'some error',
    });
  }
  conn.end();
};

module.exports = { controller };
