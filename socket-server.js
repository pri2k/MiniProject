import { Server } from 'socket.io';

let io;

export function setupSocket(server) {
    if (process.env.NODE_ENV === 'development') {
        if (!global.io) {
        global.io = new Server(server, {
            path: '/api/socket',
        });

        global.io.on('connection', (socket) => {
            console.log('🟢 [dev] New client connected:', socket.id);

            socket.on('sendMessage', (msg) => {
            socket.broadcast.emit('receiveMessage', msg);
            });

            socket.on('disconnect', () => {
            console.log('🔌 [dev] Client disconnected:', socket.id);
            });
        });
        }
        io = global.io;
    } else {
        if (!io) {
        io = new Server(server, {
            path: '/api/socket',
        });

        io.on('connection', (socket) => {
            console.log('🟢 New client connected:', socket.id);

            socket.on('sendMessage', (msg) => {
            socket.broadcast.emit('receiveMessage', msg);
            });

            socket.on('disconnect', () => {
            console.log('🔌 Client disconnected:', socket.id);
            });
        });
        }
    }

    return io;
}
