const app = require('../app');
const socket = require('socket.io');
const moment = require('moment');

const dbMessage = require('../api/messages/messages')
const PORT_NUMBER = 8888;

const server = app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port ${PORT_NUMBER}`);
});

// Sockets are listening the server
const io = socket(server);

io.on('connection', (socket) => {
    socket.on('enterRoom', (data) => {
        console.log(`Socket ${socket.id} joined ${data.channel.uuid}`)
        socket.join(data.channel.uuid);
    })

    socket.on('message', function(data){
        const {channel, message, user, opposite_user} = data;
        console.log(Date.now());
        const created_at = moment();
        const messageDB = {
            id_sender: user.id,
            id_receiver: opposite_user.id,
            content: message.content,
            content_type: message.content_type,
            created_at: created_at,
            id_channel: channel.id
        };
        console.log(`${user.firstname} emit to room ${channel.uuid}`)
        messageDB.sender_name = user.firstname;
        messageDB.receiver_name = opposite_user.firstname;
        io.in(channel.uuid).emit('message', {messageDB});
        dbMessage.postMessageSocket(messageDB);
    });

    socket.on('leaveRoom', (data) => {
        console.log(`Socket ${socket.id} left ${data.channel.uuid}`);
        socket.leave(data.channel.uuid);
    })
})
