/**
 * PATRÓN FACTORY - Clases de Productos Concretos
 * 
 * Estas clases representan los diferentes tipos de usuarios que pueden
 * ser creados por la Factory. Cada una implementa la misma interfaz
 * (método getPermissions()) pero con diferentes comportamientos.
 */

/**
 * Clase AdminUser - Usuario Administrador
 * 
 * Tiene todos los permisos: puede eliminar, editar y ver contenido.
 */
class AdminUser {
  constructor(name) {
    this.name = name;
    this.role = 'admin';
  }
  
  /**
   * Retorna los permisos del administrador
   * @returns {Object} Objeto con los permisos del usuario
   */
  getPermissions() {
    return {
      canDelete: true,  // Puede eliminar contenido
      canEdit: true,    // Puede editar contenido
      canView: true     // Puede ver contenido
    };
  }
}

/**
 * Clase ModeratorUser - Usuario Moderador
 * 
 * Tiene permisos limitados: puede editar y ver, pero no eliminar.
 */
class ModeratorUser {
  constructor(name) {
    this.name = name;
    this.role = 'moderator';
  }
  
  /**
   * Retorna los permisos del moderador
   * @returns {Object} Objeto con los permisos del usuario
   */
  getPermissions() {
    return {
      canDelete: false, // No puede eliminar contenido
      canEdit: true,   // Puede editar contenido
      canView: true     // Puede ver contenido
    };
  }
}

/**
 * Clase RegularUser - Usuario Regular
 * 
 * Tiene permisos mínimos: solo puede ver contenido.
 */
class RegularUser {
  constructor(name) {
    this.name = name;
    this.role = 'regular';
  }
  
  /**
   * Retorna los permisos del usuario regular
   * @returns {Object} Objeto con los permisos del usuario
   */
  getPermissions() {
    return {
      canDelete: false, // No puede eliminar contenido
      canEdit: false,   // No puede editar contenido
      canView: true      // Solo puede ver contenido
    };
  }
}

/**
 * PATRÓN FACTORY - UserFactory
 * 
 * La Factory encapsula la lógica de creación de objetos.
 * En lugar de usar `new` directamente con las clases concretas,
 * se utiliza este método estático que decide qué clase instanciar
 * según el parámetro `type`.
 * 
 * Ventajas:
 * - Centraliza la lógica de creación
 * - Facilita agregar nuevos tipos de usuarios
 * - Desacopla el código cliente de las clases concretas
 * - Permite validación y manejo de errores centralizado
 */
class UserFactory {
  /**
   * Método estático que crea y retorna una instancia del tipo de usuario solicitado
   * @param {string} type - Tipo de usuario ('admin', 'moderator', 'regular')
   * @param {string} name - Nombre del usuario
   * @returns {AdminUser|ModeratorUser|RegularUser} Instancia del tipo de usuario
   * @throws {Error} Si el tipo de usuario no es válido
   * 
   * Este método utiliza un switch para determinar qué clase instanciar.
   * El uso de toLowerCase() permite que el tipo sea case-insensitive.
   */
  static createUser(type, name) {
    switch(type.toLowerCase()) {
      case 'admin':
        return new AdminUser(name);
      case 'moderator':
        return new ModeratorUser(name);
      case 'regular':
        return new RegularUser(name);
      default:
        // Lanzar error si el tipo no es válido
        throw new Error(`Tipo de usuario "${type}" no válido`);
    }
  }
}

// ============= PRUEBAS DEL PATRÓN FACTORY =============
console.log('=== Pruebas del Patrón Factory ===\n');

/**
 * PRUEBA 1: Creación de diferentes tipos de usuarios usando la Factory
 * 
 * En lugar de usar `new AdminUser()`, `new ModeratorUser()`, etc.,
 * usamos UserFactory.createUser() que encapsula la lógica de creación.
 * Esto hace el código más flexible y fácil de mantener.
 */
const admin = UserFactory.createUser('admin', 'Alice');
const mod = UserFactory.createUser('moderator', 'Bob');
const user = UserFactory.createUser('regular', 'Charlie');

// Verificar que cada usuario tiene los permisos correctos
console.log(`${admin.name} (${admin.role}):`, admin.getPermissions());
// Alice (admin): { canDelete: true, canEdit: true, canView: true }

console.log(`${mod.name} (${mod.role}):`, mod.getPermissions());
// Bob (moderator): { canDelete: false, canEdit: true, canView: true }

console.log(`${user.name} (${user.role}):`, user.getPermissions());
// Charlie (regular): { canDelete: false, canEdit: false, canView: true }

/**
 * PRUEBA 2: Manejo de errores para tipos inválidos
 * 
 * La Factory valida el tipo de usuario y lanza un error descriptivo
 * si el tipo no es válido. Esto previene errores en tiempo de ejecución.
 */
console.log('\n--- Prueba con tipo inválido ---');
try {
  const invalid = UserFactory.createUser('superadmin', 'Dave');
} catch (error) {
  console.log('Error capturado:', error.message); // Tipo de usuario "superadmin" no válido
}

/**
 * PRUEBA 3: Creación de múltiples instancias del mismo tipo
 * 
 * La Factory puede crear múltiples instancias del mismo tipo.
 * Cada instancia es independiente (diferentes objetos en memoria).
 */
console.log('\n--- Creando múltiples usuarios ---');
const admin2 = UserFactory.createUser('admin', 'Eve');
const regular2 = UserFactory.createUser('regular', 'Frank');

console.log(`${admin2.name} (${admin2.role}):`, admin2.getPermissions());
console.log(`${regular2.name} (${regular2.role}):`, regular2.getPermissions());

console.log('\n✅ Todas las pruebas pasaron correctamente!');

