const {Router} = require('express');
const router = Router();

const rutasProtegidas = Router();

rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, app.get('llave'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token incorrecto.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Debe indicar un token.'
        });
    }
});
const {getClients,getClientByCedula, getClientById, CreateUser, CreateClient, getUserById
    , ChangeStateUser, UpdateClient, getProducts, getProductByName, getProductById, 
    CreateProduct, UpdateProduct, DeleteProduct, getOrderHeaders, getOrderHeaderById, 
    getOrderHeaderByDate, CreateOrderHeader, getOrderDetailByHeaderId, 
    CreateOrderDetail, Login, SaveImage, getProductByCategory, getImageById} = require('../controllers/index')
//Cliente
router.get('/clientes',rutasProtegidas,getClients);
router.get('/clientes/cedula/:per_cedula',rutasProtegidas,getClientByCedula);
router.get('/clientes/id/:per_id',rutasProtegidas,getClientById);
router.get('/clientes/usuario/id/:usr_id',rutasProtegidas,getUserById);
router.post('/clientes/usuario',CreateUser);
router.post('/clientes',CreateClient)
router.put('/clientes/usuario/:usr_id' ,rutasProtegidas,ChangeStateUser)
router.put('/clientes/id/:per_id',rutasProtegidas,UpdateClient);
// Productos
router.get('/productos',rutasProtegidas,getProducts);
router.get('/productos/nombre/:pro_nombre',rutasProtegidas,getProductByName);
router.get('/productos/id/:pro_id',rutasProtegidas,getProductById);
router.get('/productos/categoria/:cat_id',rutasProtegidas,getProductByCategory);
router.post('/productos',rutasProtegidas,CreateProduct);
router.put('/productos/id/:pro_id',rutasProtegidas,UpdateProduct);
router.put('/productos/delete/:pro_id',rutasProtegidas,DeleteProduct)
//PedidosCabecera
router.get('/pedidos/cabeceras',rutasProtegidas,getOrderHeaders);
router.get('/pedidos/cabeceras/:ped_cab_id',rutasProtegidas,getOrderHeaderById);
router.get('/pedidos/cabeceras/fecha/:ped_cab_fecha',rutasProtegidas,getOrderHeaderByDate)
router.post('/pedidos/cabeceras',rutasProtegidas,CreateOrderHeader);
//PedidosDetalle
router.get('/pedidos/detalles/:ped_cab_id',rutasProtegidas,getOrderDetailByHeaderId);
router.post('/pedidos/detalles',rutasProtegidas,CreateOrderDetail)
//Login
router.get('/login',Login)
//SubidaImagenes url
router.get('/image/:pro_id',getImageById)
router.post('/save/image',SaveImage)

module.exports = router;