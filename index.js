const express = require('express');
const routerApi = require('./routes');
const cors = require('cors')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = 3000;

// se debe agregar para recibir información en formato json por el body
app.use(express.json());

// para los cors
// para darle acceso a cualquier origen
// app.use(cors());

// para darle acceso a origines específicos

require('./utils/auth'); // Importa la configuración de autenticación

const whiteList = ['http://localhost:8080', 'https://myapp.com']
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World! server in express');
});

app.get('/nueva-ruta',
  checkApiKey,
  (req, res) => {
  res.send('Hello World! nueva ruta');
  }
);

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
