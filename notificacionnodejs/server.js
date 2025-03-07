const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());


const sonidoNotificacion = "https://cdn.pixabay.com/audio/2024/05/19/audio_48ac856676.mp3"


app.post("/api/notificar-conexion", (req, res) => {
    res.json({ success: true, sonido: sonidoNotificacion });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor de notificaciones corriendo en http://localhost:${PORT}`);
});
