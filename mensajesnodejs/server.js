const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

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

const nombresURL = "https://raw.githubusercontent.com/son-link/random_npc_name_generator/master/names/m_jp.txt";
let nombres = [];
const usuariosConectados = {};

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

app.get("/usuario", (req, res) => {
    const userName = nombres.length > 0 ? nombres[Math.floor(Math.random() * nombres.length)] : "Usuario";
    res.json({ usuario: userName });
});

io.on("connection", async (socket) => {
    try {
        const response = await axios.get("http://localhost:3000/usuario");
        const userName = response.data.usuario;

        usuariosConectados[socket.id] = userName;

        console.log(`Usuario conectado: ${userName}`);

        let sonidoNotificacion = null;
        try {
            const res = await axios.post("http://localhost:3002/api/notificar-conexion");
            sonidoNotificacion = res.data.sonido;
        } catch (error) {
            console.error("Error obteniendo sonido de notificación:", error.message);
        }

        io.emit("usuarioConectado", {
            usuario: userName,
            usuarios: Object.values(usuariosConectados),
            sonido: sonidoNotificacion
        });

        socket.emit("asignarNombre", userName);

        socket.on("mensaje", (data) => {
            const timestamp = new Date().toLocaleTimeString();
            io.emit("mensaje", { usuario: usuariosConectados[socket.id], mensaje: data, hora: timestamp });
            console.log(`Usuario ${usuariosConectados[socket.id]} envió un mensaje: ${data}`);
        });

        socket.on("disconnect", () => {
            console.log(`Usuario desconectado: ${usuariosConectados[socket.id]}`);
            delete usuariosConectados[socket.id];

            io.emit("usuarioDesconectado", { usuario: userName, usuarios: Object.values(usuariosConectados) });
        });

    } catch (error) {
        console.error("Error al obtener el usuario:", error.message);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
