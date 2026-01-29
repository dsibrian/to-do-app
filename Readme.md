# 📋 To-Do App con Notificaciones

Una aplicación de lista de tareas desarrollada con **Node.js** y **Vanilla JavaScript**. Permite gestionar tareas, guardar el progreso localmente y programar alarmas sonoras para recordatorios.

## 🚀 Instrucciones de Instalación y Ejecución

Sigue estos pasos para configurar el proyecto en tu entorno local.

### 1. Clonar el repositorio
Descarga el código fuente a tu máquina local.
```bash
git clone <URL_DEL_REPOSITORIO>
cd to-do-app
```

### 2. Crear una rama de trabajo
Para mantener el flujo de trabajo organizado, crea una nueva rama donde realizarás tus cambios antes de hacer push.
```bash
git checkout -b feature/nombre-de-tu-funcionalidad
```

### 3. Instalar dependencias
Instala las librerías necesarias (Express) definidas en el proyecto.
```bash
npm install
```

### 4. Ejecutar el proyecto
Levanta el servidor local.
```bash
npm start
```
La aplicación estará disponible en: http://localhost:8080 

***

## Estructura del Proyecto
El proyecto sigue una arquitectura de servidor estático simple:


```bash
to-do-app
├── public/           # Archivos del Frontend
│   ├── index.html    # Maquetación (Bootstrap 5)
│   ├── script.js     # Lógica (Módulos, Notificaciones, LocalStorage)
│   └── styles.css    # Estilos (Gradientes, Custom Checkboxes)
└── server.js         # Servidor Backend (Node.js/Express)
```

## 🛠️ Explicación del Código

### Backend (server.js)
El servidor está construido con Express. Su función principal es servir los archivos estáticos de la carpeta public.

* Static Serving: Utiliza express.static para entregar el HTML, CSS y JS.
* Rutas: Incluye un "catch-all" (app.get("*")) que maneja cualquier ruta no definida devolviendo un mensaje de estado, lo cual previene errores si se expande la app a una SPA (Single Page Application).
* Puerto: Se configura automáticamente en el puerto 8080 o el definido en las variables de entorno.

### Lógica del Cliente (script.js)
El código JavaScript utiliza un patrón modular (objetos literales) para organizar la responsabilidad de cada parte de la aplicación:

* DOM: Un objeto que almacena las referencias a los elementos HTML (inputs, listas, botones) para mejorar el rendimiento y no buscarlos repetidamente.
* StorageManager: Se encarga de la persistencia de datos. Guarda el HTML interno de la lista en localStorage cada vez que hay un cambio, y lo carga al iniciar la app.
* NotificationManager: Gestiona las alertas.
    *  Solicita permiso al navegador para enviar notificaciones.
    *  Verifica cada segundo (setInterval) si la hora actual coincide con la hora programada en alguna tarea.
    *  Si coinciden, dispara una notificación de escritorio y reproduce un sonido.

* TaskManager: Controla la creación y eliminación de tareas.
    *  Genera dinámicamente los elementos <li> con la tarea y la hora.
    * Maneja los eventos de click para marcar tareas como completadas (clase .checked) o eliminarlas.

### 3. Estilos y UI (styles.css & index.html)

* Diseño: Se utiliza Bootstrap 5 para la estructura de la tarjeta y la responsividad.

* Fondo: Un gradiente radial personalizado en el body.

* Checkboxes Personalizados: En styles.css, no se usan checkboxes nativos. Se manipulan los pseudo-elementos before de los ´li´: 
    * Estado normal: Muestra un icono de círculo vacío.
    * Estado .checked: Cambia la imagen de fondo a un "check" verde y tacha el texto.

## 📦 Dependencias
* Express: Framework web para Node.js.
* Bootstrap 5 (CDN): Framework de estilos CSS.
* Fuentes y Iconos: Google Fonts y Flaticon/CDN para recursos visuales.

