const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const socketio = require('socket.io')
const osu = require('node-os-utils')


/* eslint-disable */
//aca obtengo toda la funcionalidad de express, depositada en la constante serve
const server = express()

//especificamos el formato de datos que va a manipular nuestor servidor, es decir, nuestra API
server.use(express.json())

//nos va a permitir comunicar al cliente con el servidor, y viceversa
server.use(cors())

//nos va a notificar en la consola, cada vez que se haga petición HTTP(put,delete,post,get)
server.use(morgan('dev'))

//seteamos puerto disponible en el sistema
server.set('port', process.env.PORT || 3000)

//poner las rutas en funcionamiento
server.use(require('./routes/cliente.route'))


//le damos arranque a nuestro servidor
const servidor = server.listen( server.get('port') )

console.log(`Servidor corriendo en el puerto: ${server.get('port')}`)


const io = socketio(servidor)
const cpu = osu.cpu
const memoria = osu.mem
const mem = osu.mem

io.on('connection', () => {

  setInterval(() => {
    cpu.usage().then((info)=>{
      io.sockets.emit('uso_cpu', {dato:info,nombre:'Martin Tamborini'})
      console.log(info)
    })

    cpu.free().then((info)=>{
      io.sockets.emit('cpu_free', info)
      console.log(info)
    })

    /*cpu.model().then((info)=>{
      io.sockets.emit('modelo_cpu', info)
      console.log(info)
    })*/

    memoria.free().then((totalMemMb)=>{
      io.sockets.emit('memoria_free', totalMemMb.freeMemMb)
      console.log(totalMemMb)
    })

    memoria.used().then((usedMemMb)=>{
      io.sockets.emit('memoria_usada', usedMemMb , ' MB')
      console.log(usedMemMb)
    })

    memoria.used().then((totalMemMb)=>{
      io.sockets.emit('memoria_total', totalMemMb)
      console.log(totalMemMb)
    })

  }, 3000)
})