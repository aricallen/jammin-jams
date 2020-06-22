const express = require('express');
const { get } = require('lodash');
const { adapter } = require('../adapters/stripe');
const { getConnection, getRecords } = require('../utils/db-helpers');
const { updateProductInventory } = require('../utils/inventory');

const router = express.Router();

/**
 * get prices + products from stripe and combine with inventory quanitity to return to FE for shop
 * stripe products are not tied to prices, but prices have a `product` prop which
 * is the product.id
 */
router.get('/', async (req, res) => {
  try {
    const { data: prices } = await adapter.prices.list({ limit: 100 });
    const { data: products } = await adapter.products.list({ limit: 100 });
    const conn = await getConnection();
    await updateProductInventory(conn, products);
    const inventory = await getRecords(conn, 'inventory');
    const records = products
      .filter((product) => get(product, 'metadata.isActive') === 'true')
      .map((product) => {
        const price = prices.find((p) => p.product === product.id);
        const qtyForProduct = inventory.find((item) => item.productId === product.id);
        return {
          ...product,
          price: get(price, 'unit_amount'),
          priceDescription: get(price, 'nickname'),
          quantity: qtyForProduct ? qtyForProduct.quantity : 0,
        };
      })
      .sort((a, b) => {
        const aPos = a.metadata.sortPosition || 0;
        const bPos = b.metadata.sortPosition || 0;
        return aPos < bPos ? -1 : 1;
      });
    return res.send({ data: records });
  } catch (err) {
    const message = 'error fetching products for fundraiser';
    res.status(400).send({ error: err, message });
    throw new Error(message);
  }
});

module.exports = { router };
