// ============= SINGLETON: Configuración del Blog =============
class BlogConfig {
  constructor() {
    // TODO: Implementar patrón Singleton
    // Valores por defecto
    this.settings = {
      blogName: 'Mi Blog Increíble',
      postsPerPage: 10,
      allowComments: true,
      premiumEnabled: true
    };
  }
  
  get(key) {
    // TODO: Devuelve el valor de configuración
  }
  
  set(key, value) {
    // TODO: Establece un valor de configuración
  }
}

// ============= FACTORY: Creación de Posts =============
class TextPost {
  constructor(title, content, author) {
    this.id = Date.now() + Math.random();
    this.type = 'text';
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = new Date();
    this.views = 0;
    this.isPremium = false;
  }
  
  display() {
    return `[POST DE TEXTO] ${this.title}\nPor: ${this.author}\n${this.content}`;
  }
}

class ImagePost {
  // TODO: Implementar clase ImagePost
  // Debe tener: id, type, title, imageUrl, caption, author, createdAt, views, isPremium
  // Debe tener método display()
}

class VideoPost {
  // TODO: Implementar clase VideoPost
  // Debe tener: id, type, title, videoUrl, description, author, createdAt, views, isPremium
  // Debe tener método display()
}

class PostFactory {
  static createPost(type, data) {
    // TODO: Crear y devolver el tipo correcto de post según el tipo
    // Tipos válidos: 'text', 'image', 'video'
  }
}

// ============= OBSERVER: Notificaciones =============
class BlogSubscriber {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  notify(post) {
    // TODO: Implementar notificación al suscriptor
    console.log(`📧 ${this.name} (${this.email}) notificado: Nuevo post "${post.title}" por ${post.author}`);
  }
}

class BlogNotifier {
  constructor() {
    this.subscribers = [];
  }
  
  subscribe(subscriber) {
    // TODO: Agregar suscriptor
  }
  
  unsubscribe(subscriber) {
    // TODO: Remover suscriptor
  }
  
  notifyAll(post) {
    // TODO: Notificar a todos los suscriptores
  }
}

// ============= PROXY: Control de Acceso Premium =============
class PostProxy {
  constructor(post, user) {
    this.post = post;
    this.user = user;
  }
  
  display() {
    // TODO: Controlar acceso a contenido premium
    // Si el post es premium y el usuario no es premium, mostrar mensaje de bloqueo
    // Si tiene acceso, incrementar vistas y mostrar el contenido
  }
  
  getInfo() {
    // TODO: Devolver información del post sin el contenido completo
    return {
      title: this.post.title,
      author: this.post.author,
      type: this.post.type,
      views: this.post.views,
      isPremium: this.post.isPremium
    };
  }
}

// ============= STRATEGY: Ordenamiento de Posts =============
class SortByDateStrategy {
  sort(posts) {
    // TODO: Ordenar posts por fecha (más recientes primero)
  }
  
  getName() {
    return "Más recientes primero";
  }
}

class SortByPopularityStrategy {
  sort(posts) {
    // TODO: Ordenar posts por popularidad (más vistas primero)
  }
  
  getName() {
    return "Más populares primero";
  }
}

class SortByTitleStrategy {
  sort(posts) {
    // TODO: Ordenar posts por título (A-Z)
  }
  
  getName() {
    return "Por título (A-Z)";
  }
}

// ============= CLASE PRINCIPAL: Blog =============
class Blog {
  constructor() {
    this.config = new BlogConfig();
    this.posts = [];
    this.notifier = new BlogNotifier();
    this.sortStrategy = new SortByDateStrategy();
  }
  
  createPost(type, data, isPremium = false) {
    // TODO: Crear post usando Factory, agregarlo a la lista y notificar
    const post = PostFactory.createPost(type, data);
    post.isPremium = isPremium;
    this.posts.push(post);
    
    console.log(`\n✨ Nuevo post creado: "${post.title}" (${post.type})`);
    
    // Notificar a suscriptores
    this.notifier.notifyAll(post);
    
    return post;
  }
  
  setSortStrategy(strategy) {
    // TODO: Establecer estrategia de ordenamiento
    this.sortStrategy = strategy;
    console.log(`\n📊 Estrategia de ordenamiento cambiada a: ${strategy.getName()}`);
  }
  
  getSortedPosts() {
    // TODO: Devolver posts ordenados según la estrategia actual
    return this.sortStrategy.sort(this.posts);
  }
  
  displayPosts(user) {
    console.log(`\n\n========== ${this.config.get('blogName')} ==========`);
    console.log(`Ordenado por: ${this.sortStrategy.getName()}\n`);
    
    const sortedPosts = this.getSortedPosts();
    
    sortedPosts.forEach((post, index) => {
      console.log(`\n--- Post ${index + 1} ---`);
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

// ============= PRUEBAS =============
console.log("=".repeat(60));
console.log("SISTEMA DE BLOG - EJERCICIO");
console.log("=".repeat(60));

// Crear blog
const blog = new Blog();

// Crear suscriptores
const subscriber1 = new BlogSubscriber("Ana García", "ana@example.com");
const subscriber2 = new BlogSubscriber("Carlos López", "carlos@example.com");

blog.notifier.subscribe(subscriber1);
blog.notifier.subscribe(subscriber2);

// Crear usuarios
const regularUser = new User("Usuario Regular", false);
const premiumUser = new User("Usuario Premium", true);

// Crear posts
blog.createPost('text', {
  title: 'Introducción a JavaScript',
  content: 'JavaScript es un lenguaje de programación versátil...',
  author: 'Juan Pérez'
});

blog.createPost('image', {
  title: 'Paisaje hermoso',
  imageUrl: 'https://example.com/paisaje.jpg',
  caption: 'Una vista espectacular de las montañas',
  author: 'María González'
});

blog.createPost('video', {
  title: 'Tutorial de React',
  videoUrl: 'https://example.com/react-tutorial.mp4',
  description: 'Aprende React desde cero en este tutorial completo',
  author: 'Pedro Martínez'
}, true); // Este es premium

// Mostrar posts
blog.displayPosts(regularUser);

