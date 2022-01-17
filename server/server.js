const app = require('express')();
app.set('transports', ['websocket'])
const httpServer = require("http").createServer(app);
const options = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
}
const io = require('socket.io')(httpServer, options);

const port = process.env.PORT || 4001;

let userCount = 0
let users = []

io.on("connection", (socket) => {
    const log = (string, data) => {
        if(data){
            console.log(`${string}: ${data}`)
        }else{
            console.log(string)
        }
    }

    const emit = (nameSpace, data, createLog = true) => {
        if(createLog){
            log(nameSpace, data)
        }
        socket.emit(nameSpace, data)
    }

    const initialPos = { 
        x: 0,
        y: 0,
        z: 0
    }

    const userId = userCount++
    users.push(userId)

    log(`New client connected: ${userId}`)
    log(`all users: ${users}`)

    emit('connected', `Connection succesful, you are user: ${userId}` , false)
    emit('setBoxPos', initialPos, false)

    socket.on('updateBoxPos', (data) => {
        let newPos = {
            x: data.x,
            y: data.y,
            z: data.z
        }
        socket.broadcast.emit('setBoxPos', newPos, false)
    })

    socket.on("disconnect", () => {
        const index = users.indexOf(userId)
        if (index > -1) {
            users.splice(index, 1)
        }
        log("Client disconnected")
    })

})


httpServer.listen( port, ()=> console.log(`Started listening on port: ${port}`))