/**
 * PATRÓN OBSERVER - Implementación de NotificationCenter (Subject/Observable)
 * 
 * El patrón Observer define una dependencia uno-a-muchos entre objetos,
 * de manera que cuando un objeto cambia su estado, todos sus dependientes
 * son notificados y actualizados automáticamente.
 * 
 * NotificationCenter actúa como el Subject (Observable) que mantiene
 * una lista de observadores (suscriptores) y los notifica cuando
 * ocurre un evento (nueva notificación).
 */
class NotificationCenter {
  /**
   * Constructor del NotificationCenter
   * 
   * Inicializa un objeto que organiza los suscriptores por tipo de notificación.
   * Esto permite que los suscriptores se registren solo para los tipos
   * de notificaciones que les interesan.
   */
  constructor() {
    // Estructura que organiza suscriptores por tipo de notificación
    // Cada tipo tiene su propia lista de suscriptores
    this.subscribers = {
      email: [],
      sms: [],
      push: []
    };
  }
  
  /**
   * Suscribe un observador a un tipo específico de notificación
   * @param {string} type - Tipo de notificación (email, sms, push)
   * @param {Subscriber} subscriber - El suscriptor que recibirá las notificaciones
   * 
   * Agrega el suscriptor a la lista correspondiente al tipo de notificación.
   * Si el tipo no existe, muestra un mensaje de error.
   */
  subscribe(type, subscriber) {
    if (this.subscribers[type]) {
      this.subscribers[type].push(subscriber);
    } else {
      console.log(`Tipo de notificación "${type}" no válido`);
    }
  }
  
  /**
   * Desuscribe un observador de un tipo específico de notificación
   * @param {string} type - Tipo de notificación
   * @param {Subscriber} subscriber - El suscriptor a remover
   * 
   * Utiliza filter() para crear una nueva lista sin el suscriptor especificado.
   * Esto mantiene la inmutabilidad y evita problemas de referencia.
   */
  unsubscribe(type, subscriber) {
    if (this.subscribers[type]) {
      this.subscribers[type] = this.subscribers[type].filter(
        sub => sub !== subscriber
      );
    }
  }
  
  /**
   * Notifica a todos los suscriptores de un tipo específico
   * @param {string} type - Tipo de notificación
   * @param {string} message - Mensaje a enviar
   * 
   * Este es el método clave del patrón Observer. Cuando se llama,
   * recorre todos los suscriptores del tipo especificado y llama
   * a su método update() para notificarlos.
   */
  notify(type, message) {
    if (this.subscribers[type]) {
      this.subscribers[type].forEach(subscriber => {
        subscriber.update(type, message);
      });
    }
  }

  /**
   * Método auxiliar para obtener el número de suscriptores de un tipo
   * @param {string} type - Tipo de notificación
   * @returns {number} Cantidad de suscriptores
   */
  getSubscribersCount(type) {
    return this.subscribers[type] ? this.subscribers[type].length : 0;
  }
}

/**
 * PATRÓN OBSERVER - Implementación de Subscriber (Observer)
 * 
 * Subscriber representa al Observer en el patrón Observer.
 * Cada suscriptor implementa el método update() que será llamado
 * cuando el Subject (NotificationCenter) notifique un evento.
 */
class Subscriber {
  /**
   * Constructor del Subscriber
   * @param {string} name - Nombre del suscriptor
   */
  constructor(name) {
    this.name = name;
  }
  
  /**
   * Método update() - Interfaz del Observer
   * 
   * Este método es llamado automáticamente por el NotificationCenter
   * cuando se emite una notificación del tipo al que está suscrito.
   * 
   * @param {string} type - Tipo de notificación recibida
   * @param {string} message - Mensaje de la notificación
   * 
   * En una implementación real, aquí se podría enviar un email,
   * SMS, push notification, etc.
   */
  update(type, message) {
    console.log(`${this.name} recibió ${type}: ${message}`);
  }
}

// ============= PRUEBAS DEL PATRÓN OBSERVER =============
console.log('=== Pruebas del Patrón Observer ===\n');

// Crear el Subject (Observable)
const notificationCenter = new NotificationCenter();

// Crear múltiples Observers (Suscriptores)
const user1 = new Subscriber("Usuario 1");
const user2 = new Subscriber("Usuario 2");
const user3 = new Subscriber("Usuario 3");

/**
 * PRUEBA 1: Suscripción a diferentes tipos de notificaciones
 * 
 * user1 se suscribe a email y sms
 * user2 se suscribe solo a email
 * user3 se suscribe solo a push
 */
notificationCenter.subscribe('email', user1);
notificationCenter.subscribe('sms', user1);
notificationCenter.subscribe('email', user2);
notificationCenter.subscribe('push', user3);

/**
 * PRUEBA 2: Notificación a múltiples suscriptores del mismo tipo
 * 
 * Al notificar por email, tanto user1 como user2 reciben la notificación
 * porque ambos están suscritos a ese tipo.
 */
console.log("--- Notificación por email ---");
notificationCenter.notify('email', 'Nuevo mensaje en tu bandeja');
// Usuario 1 recibió email: Nuevo mensaje en tu bandeja
// Usuario 2 recibió email: Nuevo mensaje en tu bandeja

/**
 * PRUEBA 3: Notificación a un solo suscriptor
 * 
 * Solo user1 recibe la notificación SMS porque es el único suscrito.
 */
console.log("\n--- Notificación por SMS ---");
notificationCenter.notify('sms', 'Código de verificación: 123456');
// Usuario 1 recibió sms: Código de verificación: 123456

/**
 * PRUEBA 4: Desuscripción dinámica
 * 
 * Se desuscribe user1 de email, por lo que en la próxima notificación
 * por email solo user2 será notificado.
 */
console.log("\n--- Desuscribiendo a Usuario 1 de email ---");
notificationCenter.unsubscribe('email', user1);

console.log("\n--- Nueva notificación por email ---");
notificationCenter.notify('email', 'Otro mensaje importante');
// Usuario 2 recibió email: Otro mensaje importante (user1 ya no está suscrito)

/**
 * PRUEBA 5: Notificación a otro tipo
 * 
 * Solo user3 recibe la notificación push.
 */
console.log("\n--- Notificación push ---");
notificationCenter.notify('push', 'Nueva actualización disponible');
// Usuario 3 recibió push: Nueva actualización disponible

/**
 * PRUEBA 6: Verificación del estado de suscripciones
 * 
 * Verificamos que las suscripciones se mantengan correctamente
 * después de las operaciones de suscripción/desuscripción.
 */
console.log("\n--- Verificando suscripciones ---");
console.log(`Suscriptores de email: ${notificationCenter.getSubscribersCount('email')}`); // 1 (solo user2)
console.log(`Suscriptores de sms: ${notificationCenter.getSubscribersCount('sms')}`); // 1 (solo user1)
console.log(`Suscriptores de push: ${notificationCenter.getSubscribersCount('push')}`); // 1 (solo user3)

console.log("\n✅ Todas las pruebas pasaron correctamente!");

