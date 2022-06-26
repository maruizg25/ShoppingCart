const {Router} = require('express');
const router = Router();
const {getClients,getClientByCedula, getClientById, CreateUser, CreateClient, getUserById
    , ChangeStateUser, UpdateClient, getProducts, getProductByName, getProductById, 
    CreateProduct, UpdateProduct, DeleteProduct, getOrderHeaders, getOrderHeaderById, 
    getOrderHeaderByDate, CreateOrderHeader, getOrderDetailByHeaderId, 
    CreateOrderDetail, Login, SaveImage} = require('../controllers/index')
//Cliente
router.get('/clientes',getClients);
router.get('/clientes/cedula/:per_cedula',getClientByCedula);
router.get('/clientes/id/:per_id',getClientById);
router.get('/clientes/usuario/id/:usr_id',getUserById);
router.post('/clientes/usuario',CreateUser);
router.post('/clientes',CreateClient)
router.put('/clientes/usuario/:usr_id' ,ChangeStateUser)
router.put('/clientes/id/:per_id',UpdateClient);
// Productos
router.get('/productos',getProducts);
router.get('/productos/nombre/:pro_nombre',getProductByName);
router.get('/productos/id/:pro_id',getProductById);
router.post('/productos',CreateProduct);
router.put('/productos/id/:pro_id',UpdateProduct);
router.put('/productos/delete/:pro_id',DeleteProduct)
//PedidosCabecera
router.get('/pedidos/cabeceras',getOrderHeaders);
router.get('/pedidos/cabeceras/:ped_cab_id',getOrderHeaderById);
router.get('/pedidos/cabeceras/fecha/:ped_cab_fecha',getOrderHeaderByDate)
router.post('/pedidos/cabeceras',CreateOrderHeader);
//PedidosDetalle
router.get('/pedidos/detalles/:ped_cab_id',getOrderDetailByHeaderId);
router.post('/pedidos/detalles',CreateOrderDetail)
//Login
router.get('/login',Login)
//SubidaImagenes url
router.post('/save/image',SaveImage)
//JWT

module.exports = router;