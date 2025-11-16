class NotificationCenter {
  constructor() {
    this.subscribers = {
      email: [],
      sms: [],
      push: []
    };
  }
  
  subscribe(type, subscriber) {
    // TODO: Agregar suscriptor
  }
  
  unsubscribe(type, subscriber) {
    // TODO: Remover suscriptor
  }
  
  notify(type, message) {
    // TODO: Notificar a todos los suscriptores del tipo especificado
  }
}

class Subscriber {
  constructor(name) {
    this.name = name;
  }
  
  update(type, message) {
    console.log(`${this.name} recibió ${type}: ${message}`);
  }
}

// Pruebas
const notificationCenter = new NotificationCenter();

const user1 = new Subscriber("Usuario 1");
const user2 = new Subscriber("Usuario 2");

notificationCenter.subscribe('email', user1);
notificationCenter.subscribe('sms', user1);
notificationCenter.subscribe('email', user2);

console.log("--- Notificación por email ---");
notificationCenter.notify('email', 'Nuevo mensaje en tu bandeja');
// Debe notificar a user1 y user2

console.log("\n--- Notificación por SMS ---");
notificationCenter.notify('sms', 'Código de verificación: 123456');
// Solo debe notificar a user1

