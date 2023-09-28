const { io } = require('../index')

const Band = require('../models/band.js');
const Bands = require('../models/bands.js');
const bands = new Bands();

bands.addBand( new Band('Junior H') );
bands.addBand( new Band('Natanael Cano') );
bands.addBand( new Band('Peso Pluma') );
bands.addBand( new Band('Grupo Frontera') );
bands.addBand( new Band('Eslabón Armado') );

console.log(bands)

//* Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado')

    client.emit('bandas-activas', bands.getBands())

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });
    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
    client.on('vote-band', (payload) => {
        bands.voteBand( payload.id );
        io.emit('bandas-activas', bands.getBands())
    });
    client.on('add-band', (payload) => {
        const newBand = new Band( payload.name )
        bands.addBand(newBand)
        io.emit('bandas-activas', bands.getBands())
    });
    client.on('delete-band', (payload) => {
        const newBand = new Band( payload.name )
        bands.deleteBand(payload.id)
        io.emit('bandas-activas', bands.getBands())
    });
    // client.on('emitir-mensaje', ( payload ) => {
    //     // io.emit('nuevo-mensaje', payload ) // ! Esto lo emite a todos
    //     client.broadcast.emit('nuevo-mensaje', payload ) // ! Esto lo emite a todos menos al que lo envió
    // })
});