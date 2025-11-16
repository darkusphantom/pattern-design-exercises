# Ejercicio 3: Factory para Crear Diferentes Tipos de Usuarios

## 📖 Descripción

Este ejercicio implementa el patrón **Factory** para crear diferentes tipos de usuarios con permisos específicos de manera centralizada y flexible.

## 🎯 Objetivo

Crear un sistema que permita generar diferentes tipos de usuarios (Admin, Moderator, Regular) con sus respectivos permisos, utilizando una fábrica que encapsule la lógica de creación.

## 📋 Requisitos

- Crear clases para tres tipos de usuarios: `AdminUser`, `ModeratorUser`, `RegularUser`
- Cada tipo debe tener diferentes permisos (canDelete, canEdit, canView)
- Implementar un `UserFactory` que cree el tipo correcto según un parámetro
- Incluir un método `getPermissions()` en cada clase de usuario
- Manejar errores para tipos de usuario no válidos

## 🔍 Patrón Factory

El patrón Factory encapsula la lógica de creación de objetos. En lugar de usar `new` directamente con diferentes clases, se utiliza una fábrica que decide qué clase instanciar según parámetros. Es útil cuando:

- Necesitas crear objetos de diferentes tipos basados en condiciones
- Quieres centralizar la lógica de creación
- Necesitas desacoplar el código que usa los objetos de las clases concretas
- Quieres facilitar la adición de nuevos tipos sin modificar el código existente

### Ventajas:

- **Encapsulación**: La lógica de creación está centralizada
- **Flexibilidad**: Fácil agregar nuevos tipos de usuarios
- **Mantenibilidad**: Cambios en la creación solo afectan la fábrica
- **Desacoplamiento**: El código cliente no conoce las clases concretas

## 📁 Archivos

- **`ejercicio.js`**: Código de inicio con la estructura base y comentarios TODO
- **`solucion.js`**: Implementación completa del patrón Factory

## 🚀 Cómo Ejecutar

### Ejecutar el Ejercicio (Código de Inicio)

```bash
npm run ejercicio-03
```

O directamente:

```bash
node ejercicio-03/ejercicio.js
```

### Ejecutar la Solución

```bash
npm run solucion-03
```

O directamente:

```bash
node ejercicio-03/solucion.js
```

## 💡 Explicación de la Solución

La implementación del patrón Factory se logra mediante:

1. **Clases de Usuario**:
   - `AdminUser`: Tiene todos los permisos (canDelete, canEdit, canView)
   - `ModeratorUser`: Puede editar y ver, pero no eliminar
   - `RegularUser`: Solo puede ver

2. **UserFactory**:
   - Método estático `createUser(type, name)` que recibe el tipo y nombre
   - Utiliza un `switch` para determinar qué clase instanciar
   - Lanza un error si el tipo no es válido
   - Retorna la instancia correcta del usuario

3. **Estructura de Permisos**:
   - Cada clase implementa `getPermissions()` que retorna un objeto con los permisos
   - Los permisos son: `canDelete`, `canEdit`, `canView`

## ✅ Pruebas

El código incluye las siguientes pruebas:

- Creación de usuario administrador con todos los permisos
- Creación de usuario moderador con permisos limitados
- Creación de usuario regular con permisos mínimos
- Manejo de errores para tipos de usuario inválidos
- Creación de múltiples usuarios del mismo tipo

## 📝 Ejemplo de Uso

```javascript
// Crear diferentes tipos de usuarios usando la fábrica
const admin = UserFactory.createUser('admin', 'Alice');
const mod = UserFactory.createUser('moderator', 'Bob');
const user = UserFactory.createUser('regular', 'Charlie');

// Verificar permisos
console.log(admin.getPermissions());
// { canDelete: true, canEdit: true, canView: true }

console.log(mod.getPermissions());
// { canDelete: false, canEdit: true, canView: true }

console.log(user.getPermissions());
// { canDelete: false, canEdit: false, canView: true }

// Manejo de errores
try {
  const invalid = UserFactory.createUser('superadmin', 'Dave');
} catch (error) {
  console.log(error.message); // Tipo de usuario "superadmin" no válido
}
```

## 🎓 Conceptos Aprendidos

- Implementación del patrón Factory en JavaScript
- Uso de métodos estáticos en clases
- Encapsulación de lógica de creación
- Manejo de errores con throw y try-catch
- Polimorfismo mediante interfaces comunes (getPermissions)
- Desacoplamiento entre código cliente y clases concretas

## 🔗 Casos de Uso Reales

- Sistemas de autenticación y autorización
- Creación de diferentes tipos de documentos
- Generación de diferentes tipos de notificaciones
- Creación de objetos de configuración según el entorno
- Sistemas de roles y permisos en aplicaciones

## 🔗 Recursos Adicionales

- [MDN: Classes](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [MDN: Static](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes/static)
- [Patrón Factory - Refactoring Guru](https://refactoring.guru/es/design-patterns/factory-method)

