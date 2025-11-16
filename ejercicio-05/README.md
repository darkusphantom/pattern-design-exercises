# Ejercicio 5: Proyecto Integrador - Sistema de Blog

## 📖 Descripción

Este es un **ejercicio avanzado e integrador** que combina múltiples patrones de diseño en un sistema de blog completo y funcional. Este ejercicio te ayudará a entender cómo los diferentes patrones trabajan juntos en una aplicación real.

## 🎯 Objetivo

Crear un sistema de blog completo que integre y demuestre el uso práctico de varios patrones de diseño trabajando en conjunto.

## 📋 Requisitos

El sistema debe implementar los siguientes patrones:

- **Singleton**: Para gestionar la configuración global del blog
- **Factory**: Para crear diferentes tipos de posts (Text, Image, Video)
- **Observer**: Para notificar a los suscriptores cuando hay nuevos posts
- **Proxy**: Para controlar el acceso a posts premium
- **Strategy**: Para diferentes algoritmos de ordenamiento (por fecha, por popularidad, por título)

## 🔍 Patrones Implementados

### 1. Singleton (BlogConfig)
- Garantiza una única instancia de configuración global
- Accesible desde cualquier parte del sistema
- Centraliza la configuración del blog (nombre, posts por página, etc.)

### 2. Factory (PostFactory)
- Centraliza la creación de diferentes tipos de posts
- Permite crear posts de texto, imagen y video sin conocer los detalles de cada clase
- Facilita agregar nuevos tipos de posts en el futuro

### 3. Observer (BlogNotifier + BlogSubscriber)
- Permite que usuarios se suscriban para recibir notificaciones
- Notifica automáticamente cuando se publican nuevos posts
- Desacopla la publicación de posts de las notificaciones
- Permite suscribirse y desuscribirse dinámicamente

### 4. Proxy (PostProxy)
- Controla el acceso a contenido premium
- Intercepta las llamadas para mostrar contenido
- Verifica permisos del usuario antes de mostrar contenido
- Registra automáticamente las vistas cuando se accede al contenido

### 5. Strategy (SortByDateStrategy, SortByPopularityStrategy, SortByTitleStrategy)
- Permite cambiar dinámicamente el algoritmo de ordenamiento
- No requiere modificar la clase Blog para cambiar el orden
- Fácil agregar nuevas estrategias de ordenamiento

## 📁 Archivos

- **`ejercicio.js`**: Código de inicio con la estructura base y comentarios TODO
- **`solucion.js`**: Implementación completa del sistema integrador

## 🚀 Cómo Ejecutar

### Ejecutar el Ejercicio (Código de Inicio)

```bash
npm run ejercicio-05
```

O directamente:

```bash
node ejercicio-05/ejercicio.js
```

### Ejecutar la Solución

```bash
npm run solucion-05
```

O directamente:

```bash
node ejercicio-05/solucion.js
```

## 💡 Explicación de la Arquitectura

### Flujo de Trabajo

1. **Inicialización**: Se crea una instancia del Blog que inicializa la configuración (Singleton), el notificador (Observer) y la estrategia de ordenamiento (Strategy).

2. **Creación de Posts**: 
   - Se usa PostFactory para crear posts de diferentes tipos
   - Los posts pueden marcarse como premium
   - Al crear un post, se notifica automáticamente a todos los suscriptores

3. **Visualización de Posts**:
   - Se usa PostProxy para controlar el acceso
   - Si el post es premium y el usuario no tiene acceso, se muestra un mensaje de bloqueo
   - Si tiene acceso, se incrementan las vistas y se muestra el contenido

4. **Ordenamiento**:
   - Se puede cambiar la estrategia de ordenamiento dinámicamente
   - Los posts se ordenan según la estrategia seleccionada antes de mostrarse

### Interacción entre Patrones

- **Singleton + Factory**: La configuración única se usa para personalizar el comportamiento del blog, y la Factory usa esta configuración para crear posts.

- **Factory + Observer**: Cuando se crea un post usando Factory, automáticamente se notifica a los observadores.

- **Observer + Proxy**: Los suscriptores son notificados cuando hay nuevos posts, y el Proxy controla si pueden ver el contenido completo.

- **Strategy + Proxy**: La estrategia ordena los posts, y el Proxy controla el acceso a cada post individual.

## ✅ Funcionalidades Implementadas

- ✅ Crear posts de diferentes tipos (texto, imagen, video)
- ✅ Suscribirse y desuscribirse a notificaciones
- ✅ Control de acceso a contenido premium
- ✅ Ordenamiento dinámico de posts (por fecha, popularidad, título)
- ✅ Registro automático de vistas
- ✅ Configuración global del blog
- ✅ Diferentes tipos de usuarios (regular, premium)

## 📝 Ejemplo de Uso

```javascript
// Crear blog
const blog = new Blog();

// Suscribir usuarios
const subscriber = new BlogSubscriber("Ana", "ana@example.com");
blog.notifier.subscribe(subscriber);

// Crear posts
blog.createPost('text', {
  title: 'Mi primer post',
  content: 'Contenido del post...',
  author: 'Juan'
});

blog.createPost('video', {
  title: 'Tutorial',
  videoUrl: 'https://example.com/video.mp4',
  description: 'Descripción...',
  author: 'María'
}, true); // Premium

// Crear usuarios
const regularUser = new User("Usuario", false);
const premiumUser = new User("Premium", true);

// Ver posts (regular no puede ver premium)
blog.displayPosts(regularUser);

// Cambiar ordenamiento
blog.setSortStrategy(new SortByPopularityStrategy());
blog.displayPosts(premiumUser);
```

## 🎓 Conceptos Aprendidos

- Integración de múltiples patrones de diseño
- Cómo los patrones trabajan juntos en una aplicación real
- Arquitectura de software modular y extensible
- Separación de responsabilidades
- Desacoplamiento entre componentes
- Control de acceso y permisos
- Sistemas de notificaciones
- Estrategias intercambiables

## 🔗 Casos de Uso Reales

Este tipo de arquitectura se usa en:

- Sistemas de gestión de contenido (CMS)
- Plataformas de blogs y publicaciones
- Sistemas de suscripciones y membresías
- Aplicaciones con contenido premium/freemium
- Sistemas de notificaciones en tiempo real
- Plataformas de e-learning con contenido restringido

## 🚀 Extensiones Posibles

Puedes extender este ejercicio agregando:

- **Decorator**: Para agregar funcionalidades a los posts (etiquetas, categorías)
- **Command**: Para operaciones de posts (editar, eliminar, publicar)
- **Adapter**: Para integrar diferentes fuentes de datos
- **Template Method**: Para definir el flujo de publicación de posts
- Sistema de comentarios
- Sistema de likes y reacciones
- Búsqueda y filtrado avanzado
- Sistema de categorías y etiquetas

## 🔗 Recursos Adicionales

- [Patrones de Diseño - Refactoring Guru](https://refactoring.guru/es/design-patterns)
- [JavaScript Design Patterns](https://www.patterns.dev/)
- [MDN: JavaScript Guide](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide)

## ⚠️ Nota Importante

Este es un ejercicio avanzado que requiere comprensión de los patrones anteriores. Se recomienda:

1. Completar los ejercicios 1-4 primero
2. Entender cada patrón individualmente
3. Estudiar cómo interactúan los patrones en este ejercicio
4. Experimentar modificando y extendiendo el código

