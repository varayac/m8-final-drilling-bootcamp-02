# Prueba Final Modulo 8 - Cursos Bootcamp - Parte 2

Este proyecto corresponde a la prueba final del modulo 8, continuacion de modulo 7 - Implementación de API backend Node Express - **Desarrollo de Aplicaciones Full Stack JavaScript Trainee v2.0 Vespertino**.

### Ejercicio Propuesto 🚀

El requerimiento emitido por la empresa de adiestramiento parte del principio de que los usuarios pueden participar en distintos bootcamp, y a su vez distintos bootcamp poseen distintos usuarios como se realizó en el primer sprint. Para el segundo Sprint se desea la construcción de la API RESTful con Express del bootcamp, soportará el token basado en la autenticación con JWT(JSONWebToken) y PostgreSQL.

Para la construcción de la API debe contener los siguientes funcionalidades:

-   Un usuario se puede registrar en la API.
-   Un usuario inicia sesión con el email y el password.
-   Los registros se guardarán en la base de datos PostgreSQL.
-   Una vez registrado el usuario usuario puede agregar bootcamp.
-   Puede asignar usuarios a los bootcamp.
-   La consulta de los bootcamp es pública.

La API debe proveer las siguientes endpoint:

| METHOD | URL                   | ACTION                                                                                                                                                  |
| ------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/signup           | Registro de un nuevo usuario, acceso público.                                                                                                           |
| POST   | /api/signin           | Inicio de sesión en la API, acceso público.                                                                                                             |
| GET    | /api/user/:id         | Lista información del usuario según id, acceso por medio de token, previamente iniciado sesión.                                                         |
| GET    | /api/user             | Lista información de todos los usuarios y los Bootcamp registrados, acceso por medio de token, previamente iniciado sesión.                             |
| PUT    | /api/user/:id         | Actualiza los campos de firstName y lastName de un usuario según su id, acceso por medio de token, previamente iniciado sesión.                         |
| DELETE | /api/user/:id         | Elimina el usuario según id, acceso por medio de token, previamente iniciado sesión.                                                                    |
| POST   | /api/bootcamp         | Crea un bootcamp, acceso por medio de token, previamente iniciado sesión.                                                                               |
| POST   | /api/bootcamp/adduser | Agrega usuarios previamente registrados al bootcamp, acceso por medio de token, previamente iniciado sesión.                                            |
| GET    | /api/bootcamp/:id     | Obtiene información de un bootcamp según id, y muestra los usuarios registrados en el bootcamp. Acceso por medio de token, previamente iniciado sesión. |
| GET    | /api/bootcamp         | Lista todos los bootcamp, acceso público.                                                                                                               |

### Requerimientos ⚙️

1. Adecuar el proyecto y el código que se realizó en el primer sprint, el cual se adjunta en el repositorio: [m7-final-drilling-bootcamp-01](https://github.com/varayac/m7-final-drilling-bootcamp-01), con la finalidad de que se adecue, mejoré y construya una API RESTful para el bootcamp según las rutas antes mencionadas.
2. Se implementa haciendo uso de las siguientes dependencias: `express, sequelize, pg, pg-hstore, cors, JWT(jsonwebtoken) y bcryptjs`.
3. Crear dentro de la carpeta config, el archivo db.config.js, que posee la configuración a la base de datos, el nombre de la base de datos es: `db_jwtbootcamp`.
4. Dentro de la carpeta models, se encuentran los modelos tanto para el usuario (user.model.js) como para el bootcamp (bootcamp.model.js). El archivo index.js define la conexión con sequelize a la base de datos y modelos (ejecuta relaciones).
5. La carpeta controllers posee los controladores tanto para el usuario (user.controller.js), como para el bootcamp (bootcamp.controller.js).

Para el usuario se deben adecuar los siguientes controladores para la API:

-   Crear y guardar usuarios llamado createUser
-   Obtener los bootcamp de un usuario llamado findUserById
-   Obtener todos los Usuarios incluyendo los bootcamp llamado findAll
-   Actualizar usuario por Id llamado updateUserById
-   Eliminar un usuario por Id llamado deleteUserById

Para el bootcamp se debe adecuar los siguientes controladores para la API:

-   Crear y guardar un nuevo bootcamp llamado createBootcamp
-   Agregar un Usuario al Bootcamp llamado addUser
-   Obtener los bootcamp por id llamado findById
-   Obtener todos los Usuarios incluyendo los Bootcamp llamado findAll

6. La carpeta middleware contiene los siguientes archivos:

-   `auth.js`: que contiene una función de verificar token llamada verifyToken.
-   `verifySingUp.js`: que verifica si el correo ya se encuentra ingresado al momento de registrarse
    un nuevo usuario.
-   `index.js`: módulo que exporta los middleware.

7. La carpeta `routes` contiene la definición de las rutas en los siguientes archivos:

-   user.routes.js: definen las rutas de los usuarios
-   bootcamp.user.js: definen las rutas para los bootcamp.

La estructura final es la siguiente:

    ```
    -   app
       -   config
          -   db.config.js
       -   controllers
          -   bootcamp.controller.js
          -   user.controller.js
       -   middleware
          -   auth.js
          -   index.js
          -   verifySignUp.js
       -   models
          -   index.js
          -   bootcamp.model.js
          -   user.model.js
       -   routes
          -   bootcamp.routes.js
          -   user.routes.js
    -   node_modules
    -   .env.sample
    -   .gitignore
    -   package-lock.json
    -   package.json
    -   server.js

    ```

8. Finalmente para verificar los modelos y las relaciones con sus métodos y los endpoint se hace uso de la herramienta Postman.

NOTA: estos datos se pueden ingresar mediante scripts:

Crear los siguientes usuarios:

| firstName | lastName  | email                        | password       |
| --------- | --------- | ---------------------------- | -------------- |
| Mateo     | Díaz      | mateo.diaz@correo.com        | mateo123456    |
| Santiago  | Mejías    | santiago.mejias@correo.com   | santiago123456 |
| Lucas     | Rojas     | lucas.rojas@correo.com       | lucas123456    |
| Facundo   | Fernandez | facundo.fernandez@correo.com | facundo123456  |

Crear los siguientes Bootcamp:

| title                                                          | cue | description                                                                                                                                                          |
| -------------------------------------------------------------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Introduciendo El Bootcamp De React.                            | 10  | React es la librería más usada en JavaScript para el desarrollo de interfaces.                                                                                       |
| Bootcamp Desarrollo Web Full Stack.                            | 12  | Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular MongoDB, ExpressJS.                      |
| Bootcamp Big Data, Inteligencia Artificial & Machine Learning. | 18  | Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning. |

Agregar los siguientes usuarios al Bootcamp:

| title                                                          | users                                    |
| -------------------------------------------------------------- | ---------------------------------------- |
| Introduciendo El Bootcamp De React.                            | Mateo Díaz, Santiago Mejías              |
| Bootcamp Desarrollo Web Full Stack.                            | Mateo Díaz                               |
| Bootcamp Big Data, Inteligencia Artificial & Machine Learning. | Mateo Díaz, Santiago Mejías, Lucas Rojas |

---

## RESPUESTAS:

### Preparacion en Base de Datos PostgreSQL 💾

Creacion de role `bootcamp_user` en PosgreSQL CLI.

```shell
CREATE USER bootcamp_user WITH PASSWORD '1234';
```

Creacion de Base de datos `db_bootcamp` y asignación de role.

```shell
CREATE DATABASE db_jwtbootcamp OWNER bootcamp_user;
```

### Ejecución Servidor 🤖

IMPORTANTE: Se debe customizar previamente el archivo `.env`.

Instalación:

```
npm install
```

Ejecución de servidor en unix:

```
npm run dev
```

### Sincronización con la base de datos medante scripts

`npm run sync-db` = Inserción de modelos definidos en la base de datos.

`npm run sync-users` = Inserción de usuarios en la entidad user.

`npm run sync-bootcamps` = Inserción de bootcamps en la entidad bootcamp.

`npm run sync-user-bootcamp` = Inserción de relaciones en la entidad user_bootcamp.

### Realizar las siguientes consultas (Postman / Thunder Client):

-   Iniciar sesión con usuario (email y contraseña) no registrado, por ejemplo:

    ```json
    {
    	"email": "pedroperez2@test.com",
    	"password": "25qw52qs"
    }
    ```

-   Iniciar sesión con usuario (email y contraseña) registrado, por ejemplo:

    ```json
    {
    	"email": "mateo.diaz@correo.com",
    	"password": "mateo123456"
    }
    ```

-   Listar todos los usuarios con sus bootcamp.

    ```
    http://localhost:3000/user
    ```

-   Listar el usuario con el id 3

    ```
    http://localhost:3000/findUserById/3
    ```

-   Actualizar el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro
    Sánchez.

    ```
    http://localhost:3000/update/id/1/firstname/Pedro/lastname/Sánchez/email/pedro.sanchez@correo.com
    ```

-   Eliminar un usuario por id; por ejemplo: el usuario con id=1.

    ```
    http://localhost:3000/delete/id/1
    ```

-   Consulta el Bootcamp por id, incluyendo los usuarios registrados.

    ```
    http://localhost:3000/findById/1
    ```

-   Listar todos los Bootcamp con sus usuarios.

    ```
    http://localhost:3000/bootcamp
    ```

-   Consultar un usuario por id incluyendo los bootcamp.

    ```
    http://localhost:3000/findUserById/1
    ??
    ```

-   Gestione adecuadamente el manejo de errores.

    ```
    ??
    ```

---

Create by [varayac](https://github.com/varayac) with ☕️ 🥖
