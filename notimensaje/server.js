const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());


const sonidoNotificacion = "https://cdn.pixabay.com/audio/2022/12/12/audio_e6f0105ae1.mp3"


app.post("/api/notificar-mensaje", (req, res) => {
    res.json({ success: true, sonido: sonidoNotificacion });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor de notificaciones corriendo en http://localhost:${PORT}`);
});

