const Products = require('../src/models/products.model');
const productsData = require('./products.data');

const storeData = async () => {
  try {
    await Products.deleteMany({});
    await Products.insertMany(productsData);
    console.log(`Data stored successfully in database successfully`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = storeData;
