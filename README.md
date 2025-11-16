# Patrones de Diseño en JavaScript

Este proyecto contiene una colección de ejercicios prácticos para aprender y practicar diferentes patrones de diseño en JavaScript.

Nota: Se les recomienda leer la [Guía Completa de Patrones de Diseño en JavaScript Moderno](https://darkusphantom.com/programacion/guia-completa-de-patrones-de-diseno-en-javascript-moderno/) para realizar ejercicios

## 📋 Descripción

Este repositorio está organizado en ejercicios individuales, cada uno enfocado en un patrón de diseño específico. Cada ejercicio incluye:

- **Código de inicio**: Archivo con la estructura base y comentarios TODO para implementar
- **Solución**: Implementación completa del patrón de diseño
- **README**: Documentación específica del ejercicio con explicaciones y ejemplos

## 🚀 Cómo Ejecutar

### Requisitos Previos

- Node.js versión 14.0.0 o superior
- npm (incluido con Node.js)

### Instalación

No se requieren dependencias adicionales para ejecutar los ejercicios.

### Ejecutar Ejercicios

Cada ejercicio tiene su propio script de ejecución. Puedes ejecutarlos usando npm:

```bash
# Ejecutar la solución
npm run solucion-01
npm run solucion-02
npm run solucion-03
npm run solucion-04
npm run solucion-05
```

O directamente con Node.js:

```bash
# Soluciones
node ejercicio-01/solucion.js
node ejercicio-02/solucion.js
node ejercicio-03/solucion.js
node ejercicio-04/solucion.js
node ejercicio-05/solucion.js
```

## 📁 Estructura del Proyecto

```
patrones-de-diseño-javascript/
├── README.md                 # Este archivo
├── package.json              # Configuración del proyecto
├── ejercicio-01/            # Ejercicio 1: Singleton
│   ├── README.md            # Documentación del ejercicio
│   ├── ejercicio.js         # Código de inicio
│   └── solucion.js          # Solución implementada
├── ejercicio-02/            # Ejercicio 2: Observer
│   ├── README.md            # Documentación del ejercicio
│   ├── ejercicio.js         # Código de inicio
│   └── solucion.js          # Solución implementada
├── ejercicio-03/            # Ejercicio 3: Factory
│   ├── README.md            # Documentación del ejercicio
│   ├── ejercicio.js         # Código de inicio
│   └── solucion.js          # Solución implementada
├── ejercicio-04/            # Ejercicio 4: Strategy
│   ├── README.md            # Documentación del ejercicio
│   ├── ejercicio.js         # Código de inicio
│   └── solucion.js          # Solución implementada
└── ejercicio-05/            # Ejercicio 5: Proyecto Integrador
    ├── README.md            # Documentación del ejercicio
    ├── ejercicio.js         # Código de inicio
    └── solucion.js          # Solución implementada
```

## 📚 Lista de Ejercicios

### Ejercicio 1: Singleton para Configuración
- **Ubicación**: `ejercicio-01/`
- **Patrón**: Singleton
- **Descripción**: Implementación de un sistema de configuración global con una única instancia

### Ejercicio 2: Sistema de Notificaciones con Observer
- **Ubicación**: `ejercicio-02/`
- **Patrón**: Observer
- **Descripción**: Sistema de notificaciones que notifica a múltiples suscriptores de diferentes tipos

### Ejercicio 3: Factory para Crear Diferentes Tipos de Usuarios
- **Ubicación**: `ejercicio-03/`
- **Patrón**: Factory
- **Descripción**: Sistema que crea diferentes tipos de usuarios (Admin, Moderator, Regular) con permisos específicos

### Ejercicio 4: Carrito de Compras con Strategy
- **Ubicación**: `ejercicio-04/`
- **Patrón**: Strategy
- **Descripción**: Carrito de compras que aplica diferentes estrategias de descuento de forma dinámica

### Ejercicio 5: Proyecto Integrador - Sistema de Blog
- **Ubicación**: `ejercicio-05/`
- **Patrones**: Singleton, Factory, Observer, Proxy, Strategy
- **Descripción**: Sistema de blog completo que integra múltiples patrones de diseño trabajando juntos
- **Nivel**: Avanzado

## 🎯 Objetivos de Aprendizaje

- Comprender los diferentes patrones de diseño en JavaScript
- Aprender a implementar patrones de manera práctica
- Entender cuándo y cómo aplicar cada patrón
- Mejorar las habilidades de programación orientada a objetos

## 📝 Notas

- Todos los ejercicios están escritos en JavaScript moderno (ES6+)
- Los ejercicios 1-4 son independientes entre sí y cubren patrones individuales
- El ejercicio 5 es un proyecto integrador que combina múltiples patrones
- Cada ejercicio incluye pruebas para verificar la implementación
- Las soluciones están comentadas para facilitar el aprendizaje
- Se recomienda completar los ejercicios 1-4 antes de abordar el ejercicio 5

## 🤝 Contribuciones

Este es un proyecto de aprendizaje personal y práctico de la [Guía Completa de Patrones de Diseño en JavaScript Moderno](https://darkusphantom.com/programacion/guia-completa-de-patrones-de-diseno-en-javascript-moderno/). Siéntete libre de usar estos ejercicios como referencia para tus propios proyectos.

## 📄 Licencia

MIT

