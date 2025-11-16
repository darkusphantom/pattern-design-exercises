/**
 * ============================================================================
 * PROYECTO INTEGRADOR - SISTEMA DE BLOG
 * ============================================================================
 * 
 * Este proyecto es la integración de múltiples patrones de diseño y como pueden trabajar
 * juntos en una aplicación real. Se implementan los siguientes patrones:
 * 
 * 1. SINGLETON - Para la configuración global del blog
 * 2. FACTORY - Para crear diferentes tipos de posts
 * 3. OBSERVER - Para notificar a suscriptores de nuevos posts
 * 4. PROXY - Para controlar el acceso a contenido premium
 * 5. STRATEGY - Para diferentes algoritmos de ordenamiento
 * 
 * ============================================================================
 */

/**
 * PATRÓN SINGLETON - BlogConfig
 * 
 * Garantiza que solo exista una instancia de la configuración del blog
 * en toda la aplicación. Esto asegura que todos los módulos trabajen
 * con la misma configuración.
 */
class BlogConfig {
  /**
   * Constructor del Singleton
   * 
   * Verifica si ya existe una instancia. Si existe, la devuelve.
   * Si no existe, crea la configuración por defecto y la guarda.
   */
  constructor() {
    if (BlogConfig.instance) {
      return BlogConfig.instance;
    }
    
    // Configuración por defecto del blog
    this.settings = {
      blogName: 'Mi Blog Increíble',
      postsPerPage: 10,
      allowComments: true,
      premiumEnabled: true
    };
    
    // Guardar la instancia única
    BlogConfig.instance = this;
  }
  
  /**
   * Obtiene un valor de configuración
   * @param {string} key - Clave de la configuración
   * @returns {*} Valor de la configuración
   */
  get(key) {
    return this.settings[key];
  }
  
  /**
   * Establece un valor de configuración
   * @param {string} key - Clave de la configuración
   * @param {*} value - Valor a establecer
   */
  set(key, value) {
    this.settings[key] = value;
  }
}

/**
 * PATRÓN FACTORY - Creación de Posts
 * 
 * La Factory encapsula la lógica de creación de diferentes tipos de posts.
 * Permite crear posts de texto, imagen y video sin que el código cliente
 * necesite conocer los detalles de cada clase.
 */

/**
 * Clase TextPost - Post de texto
 * 
 * Representa un post que contiene principalmente texto.
 */
class TextPost {
  constructor(title, content, author) {
    this.id = Date.now() + Math.random(); // ID único
    this.type = 'text';
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = new Date();
    this.views = 0;
    this.isPremium = false; // Indica si es contenido premium
  }
  
  /**
   * Formatea el post para mostrarlo
   * @returns {string} Representación formateada del post
   */
  display() {
    return `[POST DE TEXTO] ${this.title}\nPor: ${this.author}\n${this.content}`;
  }
}

/**
 * Clase ImagePost - Post de imagen
 * 
 * Representa un post que contiene una imagen con un caption.
 */
class ImagePost {
  constructor(title, imageUrl, caption, author) {
    this.id = Date.now() + Math.random();
    this.type = 'image';
    this.title = title;
    this.imageUrl = imageUrl;
    this.caption = caption;
    this.author = author;
    this.createdAt = new Date();
    this.views = 0;
    this.isPremium = false;
  }
  
  display() {
    return `[POST DE IMAGEN] ${this.title}\nPor: ${this.author}\nImagen: ${this.imageUrl}\n${this.caption}`;
  }
}

/**
 * Clase VideoPost - Post de video
 * 
 * Representa un post que contiene un video con descripción.
 */
class VideoPost {
  constructor(title, videoUrl, description, author) {
    this.id = Date.now() + Math.random();
    this.type = 'video';
    this.title = title;
    this.videoUrl = videoUrl;
    this.description = description;
    this.author = author;
    this.createdAt = new Date();
    this.views = 0;
    this.isPremium = false;
  }
  
  display() {
    return `[POST DE VIDEO] ${this.title}\nPor: ${this.author}\nVideo: ${this.videoUrl}\n${this.description}`;
  }
}

/**
 * PostFactory - Factory para crear posts
 * 
 * Centraliza la creación de posts. El código cliente solo necesita
 * especificar el tipo y los datos, sin conocer las clases concretas.
 */
class PostFactory {
  /**
   * Crea un post del tipo especificado
   * @param {string} type - Tipo de post ('text', 'image', 'video')
   * @param {Object} data - Datos del post (varía según el tipo)
   * @returns {TextPost|ImagePost|VideoPost} Instancia del post creado
   * @throws {Error} Si el tipo no es válido
   */
  static createPost(type, data) {
    switch(type) {
      case 'text':
        return new TextPost(data.title, data.content, data.author);
      case 'image':
        return new ImagePost(data.title, data.imageUrl, data.caption, data.author);
      case 'video':
        return new VideoPost(data.title, data.videoUrl, data.description, data.author);
      default:
        throw new Error(`Tipo de post "${type}" no válido`);
    }
  }
}

/**
 * PATRÓN OBSERVER - Sistema de Notificaciones
 * 
 * Permite que los usuarios se suscriban para recibir notificaciones
 * cuando se publican nuevos posts. Desacopla la publicación de posts
 * de las notificaciones a los usuarios.
 */

/**
 * BlogSubscriber - Observer (Observador)
 * 
 * Representa un suscriptor que recibirá notificaciones de nuevos posts.
 */
class BlogSubscriber {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  /**
   * Método update() del patrón Observer
   * 
   * Es llamado automáticamente cuando se publica un nuevo post.
   * @param {Object} post - El post que se acaba de publicar
   */
  notify(post) {
    console.log(`📧 ${this.name} (${this.email}) notificado: Nuevo post "${post.title}" por ${post.author}`);
  }
}

/**
 * BlogNotifier - Subject (Observable)
 * 
 * Mantiene una lista de suscriptores y los notifica cuando hay nuevos posts.
 */
class BlogNotifier {
  constructor() {
    this.subscribers = [];
  }
  
  /**
   * Suscribe un observador
   * @param {BlogSubscriber} subscriber - El suscriptor a agregar
   */
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
    console.log(`✅ ${subscriber.name} se suscribió al blog`);
  }
  
  /**
   * Desuscribe un observador
   * @param {BlogSubscriber} subscriber - El suscriptor a remover
   */
  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
    console.log(`❌ ${subscriber.name} se desuscribió del blog`);
  }
  
  /**
   * Notifica a todos los suscriptores sobre un nuevo post
   * @param {Object} post - El post que se acaba de publicar
   * 
   * Este método recorre todos los suscriptores y llama a su método notify().
   */
  notifyAll(post) {
    console.log(`\n📢 Notificando a ${this.subscribers.length} suscriptores...`);
    this.subscribers.forEach(subscriber => subscriber.notify(post));
  }
}

/**
 * PATRÓN PROXY - Control de Acceso Premium
 * 
 * El Proxy intercepta las llamadas a los métodos del post y controla
 * el acceso según los permisos del usuario. También registra automáticamente
 * las vistas cuando se accede al contenido.
 */
class PostProxy {
  /**
   * @param {Object} post - El post original
   * @param {User} user - El usuario que intenta acceder
   */
  constructor(post, user) {
    this.post = post;
    this.user = user;
  }
  
  /**
   * Intercepta la llamada a display() y controla el acceso
   * @returns {string} Contenido del post o mensaje de bloqueo
   * 
   * Si el post es premium y el usuario no tiene acceso premium,
   * muestra un mensaje de bloqueo. Si tiene acceso, incrementa
   * las vistas y muestra el contenido completo.
   */
  display() {
    // Verificar acceso premium
    if (this.post.isPremium && !this.user.isPremium) {
      return `🔒 [CONTENIDO PREMIUM]\n${this.post.title}\nPor: ${this.post.author}\n\n⚠️ Este contenido está disponible solo para usuarios premium.\nActualiza tu cuenta para acceder.`;
    }
    
    // Si tiene acceso, incrementar vistas y mostrar contenido
    this.post.views++;
    return this.post.display();
  }
  
  /**
   * Obtiene información del post sin el contenido completo
   * @returns {Object} Información del post
   * 
   * Útil para mostrar listas de posts sin verificar acceso premium.
   */
  getInfo() {
    return {
      title: this.post.title,
      author: this.post.author,
      type: this.post.type,
      views: this.post.views,
      isPremium: this.post.isPremium
    };
  }
}

/**
 * PATRÓN STRATEGY - Estrategias de Ordenamiento
 * 
 * Permite cambiar dinámicamente el algoritmo de ordenamiento de posts
 * sin modificar la clase Blog. Cada estrategia implementa el método sort().
 */

/**
 * SortByDateStrategy - Ordenar por fecha (más recientes primero)
 */
class SortByDateStrategy {
  /**
   * Ordena los posts por fecha de creación (más recientes primero)
   * @param {Array} posts - Array de posts a ordenar
   * @returns {Array} Posts ordenados
   */
  sort(posts) {
    // Usar spread operator para no mutar el array original
    return [...posts].sort((a, b) => b.createdAt - a.createdAt);
  }
  
  getName() {
    return "Más recientes primero";
  }
}

/**
 * SortByPopularityStrategy - Ordenar por popularidad (más vistas primero)
 */
class SortByPopularityStrategy {
  /**
   * Ordena los posts por número de vistas (más populares primero)
   * @param {Array} posts - Array de posts a ordenar
   * @returns {Array} Posts ordenados
   */
  sort(posts) {
    return [...posts].sort((a, b) => b.views - a.views);
  }
  
  getName() {
    return "Más populares primero";
  }
}

/**
 * SortByTitleStrategy - Ordenar por título (alfabéticamente)
 */
class SortByTitleStrategy {
  /**
   * Ordena los posts alfabéticamente por título
   * @param {Array} posts - Array de posts a ordenar
   * @returns {Array} Posts ordenados
   */
  sort(posts) {
    return [...posts].sort((a, b) => a.title.localeCompare(b.title));
  }
  
  getName() {
    return "Por título (A-Z)";
  }
}

/**
 * CLASE PRINCIPAL: Blog
 * 
 * Integra todos los patrones de diseño:
 * - Singleton: Usa BlogConfig para configuración global
 * - Factory: Usa PostFactory para crear posts
 * - Observer: Usa BlogNotifier para notificar suscriptores
 * - Strategy: Usa estrategias de ordenamiento intercambiables
 * - Proxy: Usa PostProxy para controlar acceso premium
 */
class Blog {
  constructor() {
    // Singleton: Configuración global única
    this.config = new BlogConfig();
    
    // Almacenamiento de posts
    this.posts = [];
    
    // Observer: Sistema de notificaciones
    this.notifier = new BlogNotifier();
    
    // Strategy: Estrategia de ordenamiento por defecto
    this.sortStrategy = new SortByDateStrategy();
  }
  
  /**
   * Crea un nuevo post usando Factory y notifica a los suscriptores
   * @param {string} type - Tipo de post ('text', 'image', 'video')
   * @param {Object} data - Datos del post
   * @param {boolean} isPremium - Si el post es premium
   * @returns {Object} El post creado
   * 
   * Este método demuestra la integración de Factory y Observer:
   * 1. Usa Factory para crear el post
   * 2. Notifica automáticamente a los suscriptores (Observer)
   */
  createPost(type, data, isPremium = false) {
    // Factory: Crear post del tipo especificado
    const post = PostFactory.createPost(type, data);
    post.isPremium = isPremium;
    this.posts.push(post);
    
    console.log(`\n✨ Nuevo post creado: "${post.title}" (${post.type})`);
    
    // Observer: Notificar a todos los suscriptores
    this.notifier.notifyAll(post);
    
    return post;
  }
  
  /**
   * Cambia la estrategia de ordenamiento (Strategy)
   * @param {Object} strategy - Estrategia de ordenamiento
   */
  setSortStrategy(strategy) {
    this.sortStrategy = strategy;
    console.log(`\n📊 Estrategia de ordenamiento cambiada a: ${strategy.getName()}`);
  }
  
  /**
   * Obtiene los posts ordenados según la estrategia actual
   * @returns {Array} Posts ordenados
   */
  getSortedPosts() {
    return this.sortStrategy.sort(this.posts);
  }
  
  /**
   * Muestra todos los posts usando Proxy para controlar acceso
   * @param {User} user - Usuario que está viendo los posts
   * 
   * Este método integra Strategy y Proxy:
   * 1. Usa Strategy para ordenar los posts
   * 2. Usa Proxy para controlar el acceso a cada post
   */
  displayPosts(user) {
    console.log(`\n\n========== ${this.config.get('blogName')} ==========`);
    console.log(`Ordenado por: ${this.sortStrategy.getName()}\n`);
    
    // Strategy: Obtener posts ordenados
    const sortedPosts = this.getSortedPosts();
    
    sortedPosts.forEach((post, index) => {
      console.log(`\n--- Post ${index + 1} ---`);
      // Proxy: Controlar acceso al post
      const proxy = new PostProxy(post, user);
      console.log(proxy.display());
      console.log(`👁️ Vistas: ${post.views}`);
    });
  }
}

// ============= USUARIO =============
class User {
  constructor(name, isPremium = false) {
    this.name = name;
    this.isPremium = isPremium;
  }
}

// ============= PRUEBAS COMPLETAS =============
console.log("=".repeat(60));
console.log("SISTEMA DE BLOG - DEMOSTRACIÓN COMPLETA");
console.log("=".repeat(60));

// Crear blog
const blog = new Blog();

// Crear suscriptores
const subscriber1 = new BlogSubscriber("Ana García", "ana@example.com");
const subscriber2 = new BlogSubscriber("Carlos López", "carlos@example.com");
const subscriber3 = new BlogSubscriber("María Rodríguez", "maria@example.com");

blog.notifier.subscribe(subscriber1);
blog.notifier.subscribe(subscriber2);
blog.notifier.subscribe(subscriber3);

// Crear usuarios
const regularUser = new User("Usuario Regular", false);
const premiumUser = new User("Usuario Premium", true);

// Crear posts
console.log("\n" + "=".repeat(60));
console.log("CREANDO POSTS");
console.log("=".repeat(60));

blog.createPost('text', {
  title: 'Introducción a JavaScript',
  content: 'JavaScript es un lenguaje de programación versátil...',
  author: 'Juan Pérez'
});

// Simular espera para diferentes timestamps
setTimeout(() => {}, 10);

blog.createPost('image', {
  title: 'Paisaje hermoso',
  imageUrl: 'https://example.com/paisaje.jpg',
  caption: 'Una vista espectacular de las montañas',
  author: 'María González'
});

setTimeout(() => {}, 10);

blog.createPost('video', {
  title: 'Tutorial de React',
  videoUrl: 'https://example.com/react-tutorial.mp4',
  description: 'Aprende React desde cero en este tutorial completo',
  author: 'Pedro Martínez'
}, true); // Este es premium

setTimeout(() => {}, 10);

blog.createPost('text', {
  title: 'Patrones de Diseño',
  content: 'Los patrones de diseño son soluciones probadas...',
  author: 'Laura Sánchez'
}, true); // Este es premium

// Simular vistas
blog.posts[0].views = 150;
blog.posts[1].views = 89;
blog.posts[2].views = 234;
blog.posts[3].views = 45;

// Desuscribir a un usuario
console.log("\n");
blog.notifier.unsubscribe(subscriber2);

// Crear un post más después de la desuscripción
blog.createPost('text', {
  title: 'Novedades de ES2024',
  content: 'Las nuevas características de JavaScript...',
  author: 'Roberto Díaz'
});

// Mostrar posts con usuario regular
console.log("\n\n" + "=".repeat(60));
console.log("VISTA DE USUARIO REGULAR (sin premium)");
console.log("=".repeat(60));
blog.displayPosts(regularUser);

// Cambiar estrategia de ordenamiento
blog.setSortStrategy(new SortByPopularityStrategy());
console.log("\n\n" + "=".repeat(60));
console.log("VISTA ORDENADA POR POPULARIDAD");
console.log("=".repeat(60));
blog.displayPosts(regularUser);

// Mostrar posts con usuario premium
blog.setSortStrategy(new SortByDateStrategy());
console.log("\n\n" + "=".repeat(60));
console.log("VISTA DE USUARIO PREMIUM (acceso completo)");
console.log("=".repeat(60));
blog.displayPosts(premiumUser);

// Ordenar por título
blog.setSortStrategy(new SortByTitleStrategy());
console.log("\n\n" + "=".repeat(60));
console.log("VISTA ORDENADA POR TÍTULO");
console.log("=".repeat(60));
blog.displayPosts(premiumUser);

// Verificar Singleton
console.log("\n\n" + "=".repeat(60));
console.log("VERIFICACIÓN DE SINGLETON");
console.log("=".repeat(60));
const config1 = new BlogConfig();
const config2 = new BlogConfig();
console.log("config1 === config2:", config1 === config2); // true
console.log("Nombre del blog:", config1.get('blogName'));

console.log("\n\n✅ Demostración completa finalizada!");

