require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productoRoutes = require('./routes/producto.routes');

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(o => o.trim())
  : [
      'http://localhost:3000',
      'https://upbtest2-fb3c5.web.app',
      'https://upbtest2-fb3c5.firebaseapp.com',
    ];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API backendUpb funcionando');
});

app.get('/puntitos', (req, res) => {
    res.send('puntitos extra');
});

app.use('/api/productos', productoRoutes);

// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores: HttpError usa su status, cualquier otro error es 500
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'JSON inválido' });
    }
    if (err.status) {
        return res.status(err.status).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
