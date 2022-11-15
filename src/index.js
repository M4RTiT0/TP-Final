const express = require('express')
const cors = require('cors')
const socketio = require('socket.io') 

const server = express()

server.set('port', process.env.PORT || 3000)

server.use(cors())

server.listen(server.get('port'), () => {
    console.log('la conexion fue exitosa!')
});

//le pasamos el servidor a socketio para habilitar el canal websocket
const io = socketio(servidor)

//establecemos la apertura del canal para emitir posteriormente los datos
io.on('connection', (socket) => {
    setinterval( () => {
        socket.emit('dato-socket', 10)
    }, 1000)

    socket.on('respuesta', (valor) => {
        console.log(valor)
    });

});