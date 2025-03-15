# Microservicios - Comunicación en Tiempo Real

Este proyecto implementa un sistema basado en microservicios para gestionar la comunicación en tiempo real entre usuarios. Utiliza **Node.js**, **Express.js**, **Socket.IO** y **Docker 🐳** para garantizar escalabilidad y facilidad de despliegue.

## 📌 Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:
- **Docker** y **Docker Compose**
- **Node.js** v16 o superior
- **Git** (para clonar el repositorio)

## 📂 Estructura del Proyecto

El sistema está compuesto por tres microservicios:

### 1️⃣ `mensajesnodejs` - Microservicio de Mensajes
- Se encarga de gestionar la comunicación en tiempo real mediante **Socket.IO**.
- Asigna nombres aleatorios a los usuarios conectados.
- Notifica a otros microservicios sobre conexiones y mensajes enviados.

### 2️⃣ `notificacionnodejs` - Microservicio de Notificación de Conexión
- Envía una notificación cuando un usuario se conecta.
- Responde con un sonido de notificación.

### 3️⃣ `notimensaje` - Microservicio de Notificación de Mensajes
- Envía una notificación cada vez que se envía un mensaje en el chat.
- Retorna un sonido de notificación.

## 📌 Frontend de Prueba

Para probar la funcionalidad del sistema, se ha desarrollado un **frontend básico** alojado en el siguiente repositorio:

🔗 **Frontend de prueba:** [Anonimo](https://github.com/Emerson-Mina/Anonimo)

Este frontend permite interactuar con los microservicios y validar la comunicación en tiempo real.

## 🚀 Uso de Docker 🐳

Se utiliza **Docker** para facilitar la ejecución y despliegue de los microservicios sin necesidad de instalar dependencias manualmente.

### 📥 Clonar el Repositorio
```sh
 git clone https://github.com/Emerson-Mina/Microservicios.git
 cd microservicios
```

### ▶️ Levantar los Servicios con Docker Compose y compila todas las imágenes relacionadas con una aplicación de Docker y luego inicia la aplicación. 
```sh
 docker-compose up --build
```

### ⏹️ Detener los Servicios
```sh
 docker-compose down
```

### ▶️ Levantar los Servicios con Docker Compose  
```sh
 docker-compose up -d
```
Cada microservicio se ejecuta en un contenedor independiente, permitiendo escalabilidad y separación de responsabilidades.

## 📌 Endpoints Disponibles

| Microservicio         | Método | Endpoint                      | Descripción |
|-----------------------|--------|--------------------------------|-------------|
| `mensajesnodejs`      | `GET`  | `/usuario`                    | Obtiene un nombre aleatorio |
| `mensajesnodejs`      | `WS`   | `socket.io`                   | Comunicación en tiempo real |
| `notificacionnodejs`  | `POST` | `/api/notificar-conexion`     | Notificación de conexión |
| `notimensaje`         | `POST` | `/api/notificar-mensaje`      | Notificación de mensaje |

## 📢 ¿Por qué Microservicios?

Se adoptó una arquitectura de microservicios para:
- **Escalabilidad**: Cada servicio puede escalarse de forma independiente.
- **Modularidad**: Facilita el mantenimiento y la evolución del sistema.
- **Despliegue independiente**: Se pueden actualizar servicios sin afectar a otros.

## 📌 Tecnología Utilizada

El sistema se basa en las siguientes tecnologías:
- **Node.js** y **Express.js** para la creación de APIs.
- **Socket.IO** para comunicación en tiempo real.
- **Docker 🐳** para el despliegue y la administración de contenedores.
- **Frontend en React** como cliente de prueba.

![Socket.IO](https://ik.imagekit.io/ably/ghost/prod/2021/03/socket-io-logo-1.jpeg?tr=w-1728,q-50)

---
