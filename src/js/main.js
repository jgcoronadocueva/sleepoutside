import ProductData from './ProductData';

// instance
const productDataInstance = new ProductData();

// main.js
import ProductListing from './ProductList.mjs';

const dataSource = {
  async getData() {
    // Simulate a data source that returns a promise with a list of products
    return new Promise(resolve => {
      const products = [
        { id: 1, name: 'Product 1', category: 'Electronics' },
        { id: 2, name: 'Product 2', category: 'Electronics' },
        { id: 3, name: 'Product 3', category: 'Home' },
        { id: 4, name: 'Product 4', category: 'Home' },
      ];
      resolve(products);
    });
  },
};

// Get the HTML element where we want to render the product list
const listElement = document.getElementById('product-list');

// Create an instance of ProductListing
const electronicsListing = new ProductListing('Electronics', dataSource, listElement);

// access the products array in the instance
console.log(electronicsListing.products); // Should log the filtered products array

// Get the products array
electronicsListing.dataSource.getData().then((products) => {
  // Call the renderList method to render the product list
  electronicsListing.renderList(products);
});