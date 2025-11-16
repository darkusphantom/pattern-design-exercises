class AppConfig {
  // TODO: Implementa el patrón Singleton aquí
  
  constructor() {
    // Valores por defecto
    this.config = {
      theme: 'light',
      language: 'es',
      apiUrl: 'https://api.example.com'
    };
  }
  
  get(key) {
    // TODO: Devuelve el valor de configuración
  }
  
  set(key, value) {
    // TODO: Establece un valor de configuración
  }
  
  reset() {
    // TODO: Restaura valores por defecto
  }
}

// Pruebas
const config1 = new AppConfig();
const config2 = new AppConfig();

console.log('¿config1 y config2 son la misma instancia?', config1 === config2); // Debe ser true
config1.set('theme', 'dark');
console.log('Theme desde config2:', config2.get('theme')); // Debe ser 'dark'

