# Ejercicio 4: Carrito de Compras con Strategy

## 📖 Descripción

Este ejercicio implementa el patrón **Strategy** para crear un carrito de compras que pueda calcular descuentos usando diferentes estrategias de manera dinámica e intercambiable.

## 🎯 Objetivo

Crear un sistema de carrito de compras que permita aplicar diferentes estrategias de descuento (sin descuento, porcentual, fijo) de forma flexible y sin modificar la clase principal.

## 📋 Requisitos

- Crear estrategias de descuento: `NoDiscount`, `PercentageDiscount`, `FixedDiscount`
- Implementar una clase `ShoppingCart` que use estas estrategias
- Permitir cambiar la estrategia de descuento dinámicamente
- Incluir un método `calculateTotal()` que aplique el descuento correspondiente
- Asegurar que el descuento fijo no resulte en valores negativos

## 🔍 Patrón Strategy

El patrón Strategy permite definir una familia de algoritmos, encapsularlos y hacerlos intercambiables. Permite que el algoritmo varíe independientemente de los clientes que lo utilizan. Es útil cuando:

- Tienes múltiples formas de realizar una tarea
- Quieres poder cambiar el algoritmo en tiempo de ejecución
- Necesitas desacoplar la implementación del algoritmo de la clase que lo usa
- Quieres evitar múltiples condicionales (if-else o switch) para seleccionar algoritmos

### Ventajas:

- **Flexibilidad**: Fácil cambiar estrategias en tiempo de ejecución
- **Extensibilidad**: Agregar nuevas estrategias sin modificar código existente
- **Desacoplamiento**: La clase principal no conoce los detalles de cada estrategia
- **Mantenibilidad**: Cada estrategia está en su propia clase

## 📁 Archivos

- **`ejercicio.js`**: Código de inicio con la estructura base y comentarios TODO
- **`solucion.js`**: Implementación completa del patrón Strategy

## 🚀 Cómo Ejecutar

### Ejecutar el Ejercicio (Código de Inicio)

```bash
npm run ejercicio-04
```

O directamente:

```bash
node ejercicio-04/ejercicio.js
```

### Ejecutar la Solución

```bash
npm run solucion-04
```

O directamente:

```bash
node ejercicio-04/solucion.js
```

## 💡 Explicación de la Solución

La implementación del patrón Strategy se logra mediante:

1. **Estrategias de Descuento**:
   - `NoDiscount`: No aplica descuento, retorna el monto original
   - `PercentageDiscount`: Aplica un descuento porcentual (ej: 10% de descuento)
   - `FixedDiscount`: Aplica un descuento fijo (ej: $100 de descuento)
   - Todas implementan el método `calculate(amount)`

2. **ShoppingCart**:
   - Mantiene una lista de items
   - Tiene una propiedad `discountStrategy` que puede cambiar dinámicamente
   - Método `setDiscountStrategy()`: Cambia la estrategia actual
   - Método `calculateTotal()`: Calcula el subtotal y aplica la estrategia de descuento
   - Método `getSubtotal()`: Calcula la suma de todos los items

3. **Flujo de Trabajo**:
   - Se agregan items al carrito
   - Se establece una estrategia de descuento
   - Al calcular el total, se aplica la estrategia seleccionada
   - La estrategia puede cambiarse en cualquier momento

## ✅ Pruebas

El código incluye las siguientes pruebas:

- Cálculo sin descuento
- Aplicación de descuento porcentual (10%, 20%)
- Aplicación de descuento fijo
- Cambio dinámico de estrategias
- Manejo de descuentos mayores que el total (no negativos)
- Cálculo con múltiples items

## 📝 Ejemplo de Uso

```javascript
// Crear carrito y agregar items
const cart = new ShoppingCart();
cart.addItem('Laptop', 1000);
cart.addItem('Mouse', 50);

// Sin descuento
console.log(cart.calculateTotal()); // 1050

// Aplicar descuento del 10%
cart.setDiscountStrategy(new PercentageDiscount(10));
console.log(cart.calculateTotal()); // 945

// Cambiar a descuento fijo de $100
cart.setDiscountStrategy(new FixedDiscount(100));
console.log(cart.calculateTotal()); // 950

// Agregar más items y cambiar estrategia
cart.addItem('Teclado', 75);
cart.setDiscountStrategy(new PercentageDiscount(20));
console.log(cart.calculateTotal()); // 900
```

## 🎓 Conceptos Aprendidos

- Implementación del patrón Strategy en JavaScript
- Composición sobre herencia
- Polimorfismo mediante interfaces comunes
- Cambio dinámico de comportamiento
- Encapsulación de algoritmos
- Desacoplamiento entre contexto y estrategias

## 🔗 Casos de Uso Reales

- Sistemas de pago con diferentes métodos (tarjeta, PayPal, transferencia)
- Algoritmos de ordenamiento intercambiables
- Sistemas de validación con diferentes reglas
- Cálculo de impuestos según diferentes jurisdicciones
- Sistemas de envío con diferentes transportistas
- Algoritmos de compresión de archivos

## 🔗 Recursos Adicionales

- [MDN: Math.max](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
- [MDN: Array.reduce](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Patrón Strategy - Refactoring Guru](https://refactoring.guru/es/design-patterns/strategy)

