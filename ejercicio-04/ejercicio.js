class NoDiscount {
  calculate(amount) {
    return amount;
  }
}

class PercentageDiscount {
  constructor(percentage) {
    this.percentage = percentage;
  }
  
  calculate(amount) {
    // TODO: Calcular descuento porcentual
  }
}

class FixedDiscount {
  // TODO: Implementar descuento fijo
}

class ShoppingCart {
  constructor() {
    this.items = [];
    this.discountStrategy = new NoDiscount();
  }
  
  addItem(item, price) {
    this.items.push({ item, price });
  }
  
  setDiscountStrategy(strategy) {
    // TODO: Establecer estrategia de descuento
  }
  
  calculateTotal() {
    // TODO: Calcular total con descuento aplicado
  }
}

// Pruebas
const cart = new ShoppingCart();
cart.addItem('Laptop', 1000);
cart.addItem('Mouse', 50);

console.log('Sin descuento:', cart.calculateTotal()); // 1050

cart.setDiscountStrategy(new PercentageDiscount(10));
console.log('Con 10% de descuento:', cart.calculateTotal()); // 945

cart.setDiscountStrategy(new FixedDiscount(100));
console.log('Con descuento fijo de $100:', cart.calculateTotal()); // 950

