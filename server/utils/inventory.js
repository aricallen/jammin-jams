const { insertRecord, getRecords } = require('./db-helpers');

/**
 * check against jj db for new products
 * if product does not exist in `inventory` table, create new record and default to 0
 */
const updateProductInventory = async (conn, productIds) => {
  try {
    const currentRecords = await getRecords(conn, 'inventory');
    const currProductIds = currentRecords.map((r) => r.productId);
    const newProductIds = productIds.filter((id) => !currProductIds.includes(id));
    for (const newProductId of newProductIds) {
      await insertRecord(conn, 'inventory', { productId: newProductId, quantity: 0 });
    }
  } catch (err) {
    throw new Error('Unable to update inventory');
  }
};

module.exports = { updateProductInventory };
