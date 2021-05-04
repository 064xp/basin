
<h1 align="center">
  <br>
  Basin
  <br>
</h1>

<h4 align="center">Aplicación para ayudar con la gestión una microempresa</h4>

<p align="center">
  <a href="#descripción">Descripción</a> •
  <a href="#tecnologías">Tecnologías</a> •
  <a href="#correr-localmente">Correr Localmente</a> •
  <a href="#licencia">Licencia</a>

</p>

<h3 align="center">
  <img src="images/basin-demo.gif" width: 200px;"/>
</h3>

## Descripción

Basin es una aplicación que ayuda al dueño de una microempresa gestionar sus ventas, pedidos y ganancias.

### ¿Cómo funciona?

Puede agregar una nueva venta o pedido presionando el sigo "+" en la esquina inferior derecha. Aqui ingresa los datos de la transacción como el nombre, el cliente, la cantidad y el precio unitario.

Una vez agregada la transacción, estará bajo transacciones pendientes. Al presionar sobre la misma, puede marcarla como completada (si ya realizó el pedido) presionando sobre el botón "✓" o marcarla como pagada presionando en el botón "$".

Ya que se marque como completada y pagada, se irá a transacciones completadas.

## Tecnologías

### Frontend

- [React](https://reactjs.org/)
  - [React Router](https://reactrouter.com/)
  - [Redux](https://redux.js.org/)

### Backend
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
  - FlaskJWT

### Base de Datos
- [SQLite](https://sqlite.org/index.html)

## Correr Localmente

### Clonar el repositorio
```bash
# Clonar este repositorio
$ git clone https://github.com/064xp/basin
$ cd basin
```

### Instalar dependencias
```bash
# Entrar al directorio frontend
$ cd frontend

# Instalar las dependencias
$ npm install

# Comenzar el servidor de desarrollo de frontend
$ npm start
```

### Correr Servidor Backend
En otra terminal
```bash
# Entrar al directorio de backend/
$ cd backend
# Instalar dependencias
$ pip install -r requirements.txt
# Comenzar Servidor
$ cd src
$ python app.py
```

## Licencia

GPL-3.0
