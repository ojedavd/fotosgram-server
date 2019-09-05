import Server from "./classes/server";
import userRoutes from "./routes/usuario";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const server = new Server();

// body parser 
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// rutas de mi app
server.app.use('/user', userRoutes);

// conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    
    if (err) throw err;
    
    console.log('Base de datos ONLINE');
});

// levantar express
server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});