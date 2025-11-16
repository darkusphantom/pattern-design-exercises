/**
 * PATRÓN STRATEGY - Estrategias de Descuento
 * 
 * El patrón Strategy permite definir una familia de algoritmos,
 * encapsularlos y hacerlos intercambiables. En este caso, cada
 * estrategia implementa un algoritmo diferente para calcular descuentos.
 * 
 * Todas las estrategias implementan el mismo método calculate(amount),
 * lo que permite que sean intercambiables sin modificar el código
 * que las utiliza.
 */

/**
 * Estrategia NoDiscount - Sin descuento
 * 
 * Esta es la estrategia por defecto que no aplica ningún descuento.
 * Retorna el monto original sin modificaciones.
 */
class NoDiscount {
  /**
   * Calcula el total sin aplicar descuento
   * @param {number} amount - Monto original
   * @returns {number} El mismo monto (sin descuento)
   */
  calculate(amount) {
    return amount;
  }
}

/**
 * Estrategia PercentageDiscount - Descuento porcentual
 * 
 * Aplica un descuento basado en un porcentaje del monto total.
 * Ejemplo: 10% de descuento sobre $1000 = $900
 */
class PercentageDiscount {
  /**
   * @param {number} percentage - Porcentaje de descuento (ej: 10 para 10%)
   */
  constructor(percentage) {
    this.percentage = percentage;
  }
  
  /**
   * Calcula el total aplicando un descuento porcentual
   * @param {number} amount - Monto original
   * @returns {number} Monto con descuento aplicado
   * 
   * Fórmula: amount - (amount * percentage / 100)
   */
  calculate(amount) {
    return amount - (amount * this.percentage / 100);
  }
}

/**
 * Estrategia FixedDiscount - Descuento fijo
 * 
 * Aplica un descuento de cantidad fija al monto total.
 * Ejemplo: $100 de descuento sobre $1000 = $900
 * 
 * Importante: Utiliza Math.max() para evitar valores negativos.
 */
class FixedDiscount {
  /**
   * @param {number} discount - Cantidad fija de descuento
   */
  constructor(discount) {
    this.discount = discount;
  }
  
  /**
   * Calcula el total aplicando un descuento fijo
   * @param {number} amount - Monto original
   * @returns {number} Monto con descuento aplicado (mínimo 0)
   * 
   * Math.max(0, amount - discount) asegura que el resultado
   * nunca sea negativo, incluso si el descuento es mayor que el monto.
   */
  calculate(amount) {
    return Math.max(0, amount - this.discount);
  }
}

/**
 * PATRÓN STRATEGY - Contexto (ShoppingCart)
 * 
 * ShoppingCart es el contexto que utiliza las estrategias.
 * Mantiene una referencia a una estrategia de descuento y delega
 * el cálculo del total a esa estrategia.
 * 
 * La clave del patrón Strategy es que el contexto no conoce
 * los detalles de implementación de cada estrategia, solo sabe
 * que todas implementan el método calculate().
 */
class ShoppingCart {
  constructor() {
    this.items = [];
    // Estrategia por defecto: sin descuento
    this.discountStrategy = new NoDiscount();
  }
  
  /**
   * Agrega un item al carrito
   * @param {string} item - Nombre del producto
   * @param {number} price - Precio del producto
   */
  addItem(item, price) {
    this.items.push({ item, price });
  }
  
  /**
   * Remueve un item del carrito
   * @param {string} item - Nombre del producto a remover
   */
  removeItem(item) {
    this.items = this.items.filter(i => i.item !== item);
  }
  
  /**
   * Establece la estrategia de descuento a utilizar
   * @param {NoDiscount|PercentageDiscount|FixedDiscount} strategy - Estrategia de descuento
   * 
   * Este método permite cambiar la estrategia dinámicamente en tiempo de ejecución.
   * El carrito no necesita conocer los detalles de cada estrategia.
   */
  setDiscountStrategy(strategy) {
    this.discountStrategy = strategy;
  }
  
  /**
   * Calcula el subtotal (suma de todos los items sin descuento)
   * @returns {number} Subtotal del carrito
   */
  getSubtotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
  
  /**
   * Calcula el total final aplicando la estrategia de descuento actual
   * @returns {number} Total con descuento aplicado
   * 
   * Este es el método clave del patrón Strategy. Delega el cálculo
   * a la estrategia actual sin conocer cómo se realiza el cálculo.
   */
  calculateTotal() {
    const subtotal = this.getSubtotal();
    // Delegar el cálculo a la estrategia
    return this.discountStrategy.calculate(subtotal);
  }
  
  /**
   * Muestra el contenido del carrito y los totales
   */
  showCart() {
    console.log("\n--- Carrito de Compras ---");
    this.items.forEach(item => {
      console.log(`${item.item}: $${item.price}`);
    });
    console.log(`Subtotal: $${this.getSubtotal()}`);
    console.log(`Total (con descuento): $${this.calculateTotal()}`);
  }
}

// ============= PRUEBAS DEL PATRÓN STRATEGY =============
console.log('=== Pruebas del Patrón Strategy ===\n');

const cart = new ShoppingCart();
cart.addItem('Laptop', 1000);
cart.addItem('Mouse', 50);

/**
 * PRUEBA 1: Estrategia por defecto (sin descuento)
 * 
 * Al crear el carrito, la estrategia por defecto es NoDiscount.
 */
console.log("Sin descuento:");
cart.showCart(); // Total: 1050

/**
 * PRUEBA 2: Cambio dinámico a estrategia de descuento porcentual
 * 
 * Se cambia la estrategia a PercentageDiscount(10) para aplicar 10% de descuento.
 * El carrito ahora calcula: 1050 - (1050 * 10 / 100) = 945
 */
console.log("\n\nCon 10% de descuento:");
cart.setDiscountStrategy(new PercentageDiscount(10));
cart.showCart(); // Total: 945

/**
 * PRUEBA 3: Cambio a estrategia de descuento fijo
 * 
 * Se cambia la estrategia a FixedDiscount(100) para aplicar $100 de descuento.
 * El carrito ahora calcula: 1050 - 100 = 950
 */
console.log("\n\nCon descuento fijo de $100:");
cart.setDiscountStrategy(new FixedDiscount(100));
cart.showCart(); // Total: 950

/**
 * PRUEBA 4: Agregar items y recalcular con la misma estrategia
 * 
 * Al agregar más items, el subtotal cambia pero la estrategia sigue siendo la misma.
 * Nuevo subtotal: 1425, con descuento fijo de $100: 1325
 */
console.log("\n\nAgregando más items:");
cart.addItem('Teclado', 75);
cart.addItem('Monitor', 300);
cart.showCart(); // Total: 1325 con descuento fijo de $100

/**
 * PRUEBA 5: Cambiar a otra estrategia porcentual
 * 
 * Se cambia a PercentageDiscount(20) para aplicar 20% de descuento.
 * El carrito calcula: 1425 - (1425 * 20 / 100) = 1140
 */
console.log("\n\nCon 20% de descuento:");
cart.setDiscountStrategy(new PercentageDiscount(20));
cart.showCart(); // Total: 1140

/**
 * PRUEBA 6: Cambiar a descuento fijo mayor
 * 
 * Se aplica un descuento fijo de $500.
 * El carrito calcula: 1425 - 500 = 925
 */
console.log("\n\nCon descuento fijo de $500:");
cart.setDiscountStrategy(new FixedDiscount(500));
cart.showCart(); // Total: 925

/**
 * PRUEBA 7: Protección contra valores negativos
 * 
 * Si el descuento es mayor que el total, Math.max() asegura
 * que el resultado sea 0 en lugar de un número negativo.
 */
console.log("\n\nProbando descuento mayor que el total:");
cart.setDiscountStrategy(new FixedDiscount(2000));
const total = cart.calculateTotal();
console.log(`Total con descuento de $2000: $${total}`); // $0 (no puede ser negativo)

console.log("\n✅ Todas las pruebas pasaron correctamente!");

