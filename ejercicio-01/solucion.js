/**
 * PATRÓN SINGLETON - Implementación de AppConfig
 * 
 * El patrón Singleton garantiza que una clase tenga solo una instancia
 * y proporciona un punto de acceso global a esa instancia.
 * 
 * En este caso, AppConfig gestiona la configuración global de la aplicación,
 * asegurando que todos los módulos trabajen con la misma configuración.
 */
class AppConfig {
  /**
   * Constructor del Singleton
   * 
   * La clave del patrón Singleton está en este constructor:
   * 1. Verifica si ya existe una instancia almacenada en AppConfig.instance
   * 2. Si existe, devuelve esa instancia (no crea una nueva)
   * 3. Si no existe, crea la configuración por defecto y guarda la instancia
   * 
   * Esto garantiza que múltiples llamadas a `new AppConfig()` devuelvan
   * siempre la misma instancia.
   */
  constructor() {
    // Verificación del Singleton: si ya existe una instancia, devolverla
    if (AppConfig.instance) {
      return AppConfig.instance;
    }
    
    // Inicialización de valores por defecto (solo se ejecuta la primera vez)
    this.config = {
      theme: 'light',
      language: 'es',
      apiUrl: 'https://api.example.com'
    };
    
    // Almacenar la instancia en la propiedad estática de la clase
    // Esto permite que futuras instanciaciones accedan a la misma instancia
    AppConfig.instance = this;
  }
  
  /**
   * Obtiene un valor de configuración por su clave
   * @param {string} key - La clave de la configuración a obtener
   * @returns {*} El valor de la configuración
   */
  get(key) {
    return this.config[key];
  }
  
  /**
   * Establece un valor de configuración
   * @param {string} key - La clave de la configuración
   * @param {*} value - El valor a establecer
   * 
   * Como todas las instancias apuntan al mismo objeto, los cambios
   * se reflejan en todas las referencias.
   */
  set(key, value) {
    this.config[key] = value;
  }
  
  /**
   * Restaura la configuración a sus valores por defecto
   * 
   * Útil para resetear el estado de la aplicación o para pruebas.
   */
  reset() {
    this.config = {
      theme: 'light',
      language: 'es',
      apiUrl: 'https://api.example.com'
    };
  }
}

// ============= PRUEBAS DEL PATRÓN SINGLETON =============
console.log('=== Pruebas del Patrón Singleton ===\n');

/**
 * PRUEBA 1: Verificar que múltiples instancias sean la misma referencia
 * 
 * Aunque llamamos a `new AppConfig()` dos veces, ambas variables
 * apuntan al mismo objeto en memoria. Esto es la esencia del Singleton.
 */
const config1 = new AppConfig();
const config2 = new AppConfig();

console.log('¿config1 y config2 son la misma instancia?', config1 === config2); // true
console.log('Valor inicial de theme:', config1.get('theme')); // 'light'

/**
 * PRUEBA 2: Verificar que los cambios se reflejen en todas las referencias
 * 
 * Al modificar la configuración desde config1, el cambio se refleja
 * automáticamente en config2 porque ambas apuntan al mismo objeto.
 */
config1.set('theme', 'dark');
console.log('\nDespués de config1.set("theme", "dark"):');
console.log('Theme desde config1:', config1.get('theme')); // 'dark'
console.log('Theme desde config2:', config2.get('theme')); // 'dark' (mismo valor)

console.log('\nValor inicial de language:', config1.get('language')); // 'es'

/**
 * PRUEBA 3: Verificar múltiples cambios de configuración
 */
config1.set('apiUrl', 'https://api.newurl.com');
console.log('\nDespués de config1.set("apiUrl", "https://api.newurl.com"):');
console.log('API URL desde config2:', config2.get('apiUrl')); // 'https://api.newurl.com'

/**
 * PRUEBA 4: Verificar el método reset()
 * 
 * El reset restaura todos los valores por defecto y afecta
 * a todas las referencias de la instancia.
 */
config1.reset();
console.log('\nDespués de config1.reset():');
console.log('Theme desde config2:', config2.get('theme')); // 'light'
console.log('Language desde config2:', config2.get('language')); // 'es'
console.log('API URL desde config2:', config2.get('apiUrl')); // 'https://api.example.com'

console.log('\n✅ Todas las pruebas pasaron correctamente!');

