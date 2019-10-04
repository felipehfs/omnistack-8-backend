const express = require('express');
const routes = require("./routes");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

mongoose.connect('mongodb://localhost/oministack-8', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.error(err));

// The server app
const app = express();
const server = http.Server(app);
const io = socketio(server);
const port = 3333;

const connectedUsers = {};

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});
// GET, POST, PUT and DELETE

// req.query - Acessar query params (para filtros)
// req.params - Acessar route params (para edição, delete)
// req.body - Acessar corpo da requisição (para criação)
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(port, () => console.log(`Running on http://localhost:${port}`));