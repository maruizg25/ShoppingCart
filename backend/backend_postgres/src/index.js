const express = require('express');
const cors = require('cors');
const app = express();
// cors
app.use(cors())
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// rutas
app.use(require('./routes/index'))
const PORT = process.env.PORT || 4000
app.listen(PORT);
console.log("Server on port 4000")