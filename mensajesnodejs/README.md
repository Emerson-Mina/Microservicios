# Microservicio de Mensajes

Este microservicio gestiona la comunicación entre usuarios en tiempo real utilizando **Socket.IO** y **Express.js**. Además, asigna nombres aleatorios a los usuarios conectados y envía notificaciones mediante otro microservicio. Se utiliza **Docker** para facilitar el despliegue y la administración del servicio, asegurando que todas las dependencias estén correctamente configuradas y que el entorno sea replicable en cualquier sistema.

---

## 📌 Estructura del Código

### 1️⃣ Importación de Módulos
```javascript
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");
```
Se importan las librerías necesarias para:
- **express**: Crear el servidor HTTP.
- **http**: Soporte para WebSockets.
- **socket.io**: Comunicación en tiempo real.
- **cors**: Permitir acceso desde cualquier origen.
- **axios**: Realizar peticiones HTTP.

### 2️⃣ Configuración del Servidor
```javascript
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(cors());
app.use(express.json());
```
Se crea el servidor Express y se configura **CORS** para permitir solicitudes desde cualquier origen. También se inicializa **Socket.IO** con soporte para conexiones de clientes.

### 3️⃣ Carga de Nombres Aleatorios
```javascript
const nombresURL = "https://raw.githubusercontent.com/son-link/random_npc_name_generator/master/names/m_jp.txt";
let nombres = [];
async function cargarNombres() {
    try {
        const response = await axios.get(nombresURL);
        nombres = response.data.split("\n").map(nombre => nombre.trim()).filter(nombre => nombre !== "");
        console.log(`Se cargaron ${nombres.length} nombres.`);
    } catch (error) {
        console.error("Error al descargar los nombres:", error.message);
        nombres = ["Usuario"];
    }
}
cargarNombres();
```
Se obtienen nombres aleatorios de un archivo remoto para asignar identificadores a los usuarios conectados.

### 4️⃣ Endpoint para Obtener un Nombre
```javascript
app.get("/usuario", (req, res) => {
    const userName = nombres.length > 0 ? nombres[Math.floor(Math.random() * nombres.length)] : "Usuario";
    res.json({ usuario: userName });
});
```
Proporciona un nombre aleatorio a cualquier solicitud HTTP en **/usuario**.

### 5️⃣ Gestión de Conexiones con Socket.IO
```javascript
io.on("connection", async (socket) => {
    try {
        const response = await axios.get("http://localhost:3000/usuario");
        const userName = response.data.usuario;
        usuariosConectados[socket.id] = userName;
        console.log(`Usuario conectado: ${userName}`);
```
Cada usuario recibe un nombre aleatorio al conectarse y se guarda en un objeto de usuarios conectados.

### 6️⃣ Notificación de Conexión
```javascript
        let sonidoNotificacion = null;
        try {
            const res = await axios.post("http://localhost:3002/api/notificar-conexion");
            sonidoNotificacion = res.data.sonido;
        } catch (error) {
            console.error("Error obteniendo sonido de notificación:", error.message);
        }
```
Cada vez que un usuario se conecta, se envía una notificación al microservicio de notificaciones.

### 7️⃣ Manejo de Mensajes
```javascript
        socket.on("mensaje", (data) => {
            const timestamp = new Date().toLocaleTimeString();
            io.emit("mensaje", { usuario: usuariosConectados[socket.id], mensaje: data, hora: timestamp });
            console.log(`Usuario ${usuariosConectados[socket.id]} envió un mensaje: ${data}`);
        });
```
Cada mensaje enviado por un usuario se retransmite a todos los demás clientes conectados en tiempo real.

### 8️⃣ Manejo de Desconexión
```javascript
        socket.on("disconnect", () => {
            console.log(`Usuario desconectado: ${usuariosConectados[socket.id]}`);
            delete usuariosConectados[socket.id];
            io.emit("usuarioDesconectado", { usuario: userName, usuarios: Object.values(usuariosConectados) });
        });
    } catch (error) {
        console.error("Error al obtener el usuario:", error.message);
    }
});
```
Cuando un usuario se desconecta, se actualiza la lista de usuarios y se emite un evento notificando su salida.

### 9️⃣ Inicio del Servidor
```javascript
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```
El servidor se ejecuta en el puerto 3000.

---

## 🐳 Uso de Docker
Se utiliza **Docker** para contenerizar el microservicio, lo que permite desplegarlo de manera rápida y eficiente en diferentes entornos sin preocuparse por las configuraciones específicas del sistema operativo. Mediante **Docker Compose**, se facilita la orquestación del servicio junto con otros microservicios relacionados, asegurando su correcto funcionamiento y comunicación dentro de una red aislada.
