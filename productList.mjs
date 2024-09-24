// ProductList.mjs
export default class ProductListing {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
      this.products = []; // Initialize an empty array to store products
  
      
      this.init();
    }
  
    //static productCardTemplate(product) {
     //   return `
     //     <li>
     //       <h2>${product.name}</h2>
     //     </li>
     //   `;
     // }
      // ProductList.mjs
    static productCardTemplate(product) {
        return `<li class="product-card">
          <a href="product_pages/index.html?product=">
            <img src="" alt="Image of ">
            <h3 class="card__brand"></h3>
            <h2 class="card__name"></h2>
            <p class="product-card__price">$</p>
          </a>
        </li>`
      }
      renderList(products) {
        // Use map to transform the products array into an array of HTML strings
        const htmlStrings = products.map((product) => ProductListing.productCardTemplate(product));
    
        // Join the HTML strings into a single string
        const html = htmlStrings.join('');
    
        // Append the HTML to the listElement
        this.listElement.innerHTML = html;
      }
    async init() {
      try {
        const data = await this.dataSource.getData();
        this.products = data.filter(product => product.category === this.category);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }
  }