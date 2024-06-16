# proyecto_reservaDeRestaurantes_fullStack


BookIt: Plataforma de Reservas de Restaurantes

BookIt es una plataforma diseñada para facilitar la reserva de mesas en restaurantes de manera eficiente tanto para clientes como para restaurantes.

¿Cómo funciona?:

1. Registro y Autenticación
Clientes y Restaurantes: Los usuarios pueden registrarse como cliente o restaurante.
Inicio de Sesión: Iniciar sesión seguro para acceder a las funcionalidades de la plataforma.

2. Reservas de Mesas
Clientes: Pueden buscar restaurantes disponibles y reservar mesas para fechas y horas específicas.
Restaurantes: Pueden gestionar las reservas recibidas, aceptando o rechazando según la disponibilidad de mesas y horarios.

3. Gestión de Perfiles
Clientes: Ver y actualizar su perfil, incluyendo detalles de contacto y preferencias.
Restaurantes: Gestionar información del restaurante, incluyendo horarios de apertura, capacidad de mesas y menús.

Tecnologías Utilizadas

Frontend: React.js, Vite (como bundler), Bootstrap (para estilos responsivos).

Backend: Node.js, Express.js para la API RESTful.

Base de Datos: MongoDB para almacenamiento de usuarios, perfiles y reservas.

Autenticación: JSON Web Tokens (JWT) para autenticación segura de usuarios.

Gestión de Estado: Context API de React para manejo de estado global.

Instalación y Ejecución:
Para ejecutar localmente el proyecto, sigue estos pasos:

Clonar el Repositorio:

bash:
git clone git@github.com:Gandino1984/proyecto_reservaDeRestaurantes_fullStack.git

cd bookit

Instalar Dependencias:

bash:
npm install
Configurar Variables de Entorno:

Crea un archivo .env en la raíz del proyecto y configura las variables necesarias como la conexión a la base de datos y el secreto para JWT.
Ejecutar la Aplicación:

bash:
npm start
Esto iniciará tanto el servidor backend como el frontend.

Acceder a la Aplicación:

Abre tu navegador y navega a http://localhost:3000 para ver la aplicación en funcionamiento.


Equipo:
Desarrolladores: Asier, Germán & Belén.