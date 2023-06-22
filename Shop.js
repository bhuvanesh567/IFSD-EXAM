const prompt=require("prompt-sync")();

class Shop {
    constructor(name, rent) {
      this.name = name;
      this.rent = rent;
    }
  }
  
  class ShoppingComplex {
    constructor() {
      this.shops = [];
    }
  
    addShop(name, rent) {
      const shop = new Shop(name, rent);
      this.shops.push(shop);
    }
  
    calculateTotalRent() {
      let totalRent = 0;
      for (const shop of this.shops) {
        totalRent += shop.rent;
      }
      return totalRent;
    }
  }
  
  function main() {
    const shoppingComplex = new ShoppingComplex();
  
    // Add shops to the shopping complex
    shoppingComplex.addShop("Shop 1", 5000);
    shoppingComplex.addShop("Shop 2", 7000);
    shoppingComplex.addShop("Shop 3", 6000);
  
    // Calculate the total rent
    const totalRent = shoppingComplex.calculateTotalRent();
  
    console.log("Total Rent:", totalRent);
  }
  
  // Call the main function
  main();
  