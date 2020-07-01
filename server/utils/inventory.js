const { insertRecord, updateRecord, getRecords } = require('./db-helpers');

/**
 * check against jj db for new products
 * if product does not exist in `inventory` table, create new record and default to 0
 */
const updateProductInventory = async (conn, products) => {
  try {
    const currentRecords = await getRecords(conn, 'inventory');
    // update existing
    currentRecords.forEach((record) => {
      const matchingProduct = products.find((p) => p.id === record.productId);
      if (matchingProduct && matchingProduct.name !== record.name) {
        updateRecord(conn, 'inventory', record.id, { productName: matchingProduct.name });
      }
    });

    // add missing
    products.forEach((product) => {
      const matchingRecord = currentRecords.find((record) => record.productId === product.id);
      if (!matchingRecord) {
        insertRecord(conn, 'inventory', {
          productId: product.id,
          productName: product.name,
          quantity: 0,
        });
      }
    });
  } catch (err) {
    throw new Error('Unable to update inventory');
  }
};

module.exports = { updateProductInventory };
