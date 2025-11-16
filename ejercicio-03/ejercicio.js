class AdminUser {
  constructor(name) {
    this.name = name;
    this.role = 'admin';
  }
  
  getPermissions() {
    // TODO: Devuelve permisos de administrador
  }
}

class ModeratorUser {
  // TODO: Implementar
}

class RegularUser {
  // TODO: Implementar
}

class UserFactory {
  static createUser(type, name) {
    // TODO: Crear y devolver el tipo correcto de usuario
  }
}

// Pruebas
const admin = UserFactory.createUser('admin', 'Alice');
const mod = UserFactory.createUser('moderator', 'Bob');
const user = UserFactory.createUser('regular', 'Charlie');

console.log(`${admin.name} (${admin.role}):`, admin.getPermissions());
// Debe mostrar: Alice (admin): { canDelete: true, canEdit: true, canView: true }

console.log(`${mod.name} (${mod.role}):`, mod.getPermissions());
// Debe mostrar: Bob (moderator): { canDelete: false, canEdit: true, canView: true }

console.log(`${user.name} (${user.role}):`, user.getPermissions());
// Debe mostrar: Charlie (regular): { canDelete: false, canEdit: false, canView: true }

