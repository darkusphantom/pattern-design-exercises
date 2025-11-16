# Ejercicio 1: Singleton para Configuración

## 📖 Descripción

Este ejercicio implementa el patrón **Singleton** para crear un sistema de configuración global que solo puede tener una instancia en toda la aplicación.

## 🎯 Objetivo

Crear una clase `AppConfig` que siga el patrón Singleton y permita gestionar la configuración de la aplicación de manera centralizada.

## 📋 Requisitos

- Crear una clase `AppConfig` que siga el patrón Singleton
- Debe permitir establecer y obtener valores de configuración (theme, language, apiUrl)
- Incluir un método `reset()` que restaure la configuración por defecto
- Asegurar que múltiples instancias devuelvan el mismo objeto

## 🔍 Patrón Singleton

El patrón Singleton garantiza que una clase tenga solo una instancia y proporciona un punto de acceso global a esa instancia. Es útil cuando:

- Necesitas exactamente una instancia de una clase
- Quieres controlar el acceso a recursos compartidos
- Necesitas un punto de acceso global a una configuración

## 📁 Archivos

- **`ejercicio.js`**: Código de inicio con la estructura base y comentarios TODO
- **`solucion.js`**: Implementación completa del patrón Singleton

## 🚀 Cómo Ejecutar

### Ejecutar el Ejercicio (Código de Inicio)

```bash
npm run ejercicio-01
```

O directamente:

```bash
node ejercicio-01/ejercicio.js
```

### Ejecutar la Solución

```bash
npm run solucion-01
```

O directamente:

```bash
node ejercicio-01/solucion.js
```

## 💡 Explicación de la Solución

La implementación del patrón Singleton se logra mediante:

1. **Propiedad estática**: Se utiliza `AppConfig.instance` para almacenar la única instancia de la clase.

2. **Verificación en el constructor**: Al crear una nueva instancia, se verifica si ya existe una instancia previa:
   ```javascript
   if (AppConfig.instance) {
     return AppConfig.instance;
   }
   ```

3. **Almacenamiento de la instancia**: Si no existe una instancia previa, se crea y se guarda:
   ```javascript
   AppConfig.instance = this;
   ```

4. **Métodos de configuración**: Los métodos `get()`, `set()` y `reset()` operan sobre el objeto de configuración compartido.

## ✅ Pruebas

El código incluye las siguientes pruebas:

- Verificar que múltiples instancias sean la misma referencia
- Comprobar que los cambios en una instancia se reflejen en todas
- Validar el método `reset()` que restaura los valores por defecto

## 📝 Ejemplo de Uso

```javascript
// Crear instancias (ambas serán la misma)
const config1 = new AppConfig();
const config2 = new AppConfig();

// Verificar que son la misma instancia
console.log(config1 === config2); // true

// Cambiar configuración desde una instancia
config1.set('theme', 'dark');

// El cambio se refleja en todas las instancias
console.log(config2.get('theme')); // 'dark'

// Restaurar configuración por defecto
config1.reset();
console.log(config2.get('theme')); // 'light'
```

## 🎓 Conceptos Aprendidos

- Implementación del patrón Singleton en JavaScript
- Uso de propiedades estáticas en clases
- Gestión de estado global compartido
- Control de instanciación de clases

## 🔗 Recursos Adicionales

- [MDN: Classes](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Patrón Singleton - Refactoring Guru](https://refactoring.guru/es/design-patterns/singleton)

