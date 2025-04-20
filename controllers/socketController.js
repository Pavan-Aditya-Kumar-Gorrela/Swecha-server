let broadcaster = null;

export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('broadcaster', () => {
      broadcaster = socket.id;
      socket.broadcast.emit('broadcaster');
      console.log(`Broadcaster set: ${broadcaster}`);
    });

    socket.on('watcher', () => {
      if (broadcaster) {
        socket.to(broadcaster).emit('watcher', socket.id);
      }
    });

    socket.on('offer', (id, message) => {
      socket.to(id).emit('offer', socket.id, message);
    });

    socket.on('answer', (id, message) => {
      socket.to(id).emit('answer', socket.id, message);
    });

    socket.on('candidate', (id, message) => {
      socket.to(id).emit('candidate', socket.id, message);
    });

    socket.on('disconnect', () => {
      if (socket.id === broadcaster) {
        broadcaster = null;
        socket.broadcast.emit('broadcasterDisconnected');
      }
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
