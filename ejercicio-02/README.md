# Ejercicio 2: Sistema de Notificaciones con Observer

## 📖 Descripción

Este ejercicio implementa el patrón **Observer** para crear un sistema de notificaciones que permite notificar a múltiples suscriptores cuando ocurren eventos específicos.

## 🎯 Objetivo

Crear un sistema de notificaciones donde múltiples suscriptores puedan recibir notificaciones de diferentes tipos (email, sms, push) y puedan suscribirse o desuscribirse dinámicamente.

## 📋 Requisitos

- Implementar una clase `NotificationCenter` que actúe como Subject (Observable)
- Crear una clase `Subscriber` que pueda recibir notificaciones de diferentes tipos
- Permitir suscribirse a tipos específicos de notificaciones (email, sms, push)
- Los suscriptores deben poder desuscribirse
- Notificar a todos los suscriptores del tipo especificado cuando se emite una notificación

## 🔍 Patrón Observer

El patrón Observer define una dependencia uno-a-muchos entre objetos, de manera que cuando un objeto cambia su estado, todos sus dependientes son notificados y actualizados automáticamente. Es útil cuando:

- Necesitas notificar a múltiples objetos sobre cambios en otro objeto
- Quieres desacoplar el emisor de notificaciones de sus receptores
- Necesitas un sistema de eventos o suscripciones

### Componentes del Patrón:

- **Subject (Observable)**: `NotificationCenter` - Mantiene una lista de observadores y notifica cambios
- **Observer**: `Subscriber` - Define una interfaz para recibir notificaciones
- **Concrete Observer**: Instancias de `Subscriber` - Implementan la actualización

## 📁 Archivos

- **`ejercicio.js`**: Código de inicio con la estructura base y comentarios TODO
- **`solucion.js`**: Implementación completa del patrón Observer

## 🚀 Cómo Ejecutar

### Ejecutar el Ejercicio (Código de Inicio)

```bash
npm run ejercicio-02
```

O directamente:

```bash
node ejercicio-02/ejercicio.js
```

### Ejecutar la Solución

```bash
npm run solucion-02
```

O directamente:

```bash
node ejercicio-02/solucion.js
```

## 💡 Explicación de la Solución

La implementación del patrón Observer se logra mediante:

1. **NotificationCenter (Subject)**:
   - Mantiene un objeto `subscribers` con listas de suscriptores por tipo de notificación
   - Método `subscribe()`: Agrega un suscriptor a un tipo específico de notificación
   - Método `unsubscribe()`: Remueve un suscriptor de un tipo específico
   - Método `notify()`: Notifica a todos los suscriptores de un tipo específico

2. **Subscriber (Observer)**:
   - Cada suscriptor tiene un nombre identificador
   - Método `update()`: Recibe y procesa las notificaciones

3. **Flujo de trabajo**:
   - Los suscriptores se registran en el `NotificationCenter` para tipos específicos
   - Cuando se emite una notificación, el centro notifica a todos los suscriptores del tipo correspondiente
   - Los suscriptores pueden desuscribirse cuando ya no desean recibir notificaciones

## ✅ Pruebas

El código incluye las siguientes pruebas:

- Suscripción a diferentes tipos de notificaciones
- Notificación a múltiples suscriptores del mismo tipo
- Notificación a suscriptores de un tipo específico
- Desuscripción de suscriptores
- Verificación de que solo los suscriptores correctos reciben las notificaciones

## 📝 Ejemplo de Uso

```javascript
// Crear el centro de notificaciones
const notificationCenter = new NotificationCenter();

// Crear suscriptores
const user1 = new Subscriber("Usuario 1");
const user2 = new Subscriber("Usuario 2");

// Suscribir usuarios a diferentes tipos de notificaciones
notificationCenter.subscribe('email', user1);
notificationCenter.subscribe('sms', user1);
notificationCenter.subscribe('email', user2);

// Emitir notificaciones
notificationCenter.notify('email', 'Nuevo mensaje en tu bandeja');
// Notifica a user1 y user2

notificationCenter.notify('sms', 'Código de verificación: 123456');
// Solo notifica a user1

// Desuscribir un usuario
notificationCenter.unsubscribe('email', user1);

// Nueva notificación solo llegará a user2
notificationCenter.notify('email', 'Otro mensaje importante');
```

## 🎓 Conceptos Aprendidos

- Implementación del patrón Observer en JavaScript
- Gestión de listas de suscriptores por categoría
- Desacoplamiento entre emisores y receptores de eventos
- Sistema de suscripciones y desuscripciones dinámicas
- Notificaciones selectivas por tipo

## 🔗 Casos de Uso Reales

- Sistemas de notificaciones en aplicaciones
- Eventos en frameworks (React, Vue, etc.)
- Sistemas de publicación/suscripción (Pub/Sub)
- Gestión de eventos en interfaces de usuario
- Sistemas de logging y monitoreo

## 🔗 Recursos Adicionales

- [MDN: Arrays](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Patrón Observer - Refactoring Guru](https://refactoring.guru/es/design-patterns/observer)

