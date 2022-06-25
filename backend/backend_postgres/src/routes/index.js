const {Router} = require('express');
const router = Router();
const {getClientes,getClienteByCedula, getClienteById, CreateUsuario, CreateCliente, getUsuarioById
    , ChangeStateUsuario, UpdateCliente, getProductos, getProductoByNombre, getProductoById, CreateProducto, UpdateProducto, DeleteProducto, getPedidosCabecera, getPedidosCabeceraById, getPedidosCabeceraByDate, CreatePedidoCabecera, getPedidoDetalleByIdCabecera, CreatePedidoDetalle} = require('../controllers/index')
//Cliente
router.get('/clientes',getClientes);
router.get('/clientes/cedula/:per_cedula',getClienteByCedula);
router.get('/clientes/id/:per_id',getClienteById);
router.get('/clientes/usuario/id/:usr_id',getUsuarioById);
router.post('/clientes/usuario',CreateUsuario);
router.post('/clientes',CreateCliente)
router.put('/clientes/usuario/:usr_id' ,ChangeStateUsuario)
router.put('/clientes/id/:per_id',UpdateCliente);
// Productos
router.get('/productos',getProductos);
router.get('/productos/nombre/:pro_nombre',getProductoByNombre);
router.get('/productos/id/:pro_id',getProductoById);
router.post('/productos',CreateProducto);
router.put('/productos/id/:pro_id',UpdateProducto);
router.put('/productos/delete/:pro_id',DeleteProducto)
//PedidosCabecera
router.get('/pedidos/cabeceras',getPedidosCabecera);
router.get('/pedidos/cabeceras/:ped_cab_id',getPedidosCabeceraById);
router.get('/pedidos/cabeceras/fecha/:ped_cab_fecha',getPedidosCabeceraByDate)
router.post('/pedidos/cabeceras',CreatePedidoCabecera);
//PedidosDetalle
router.get('/pedidos/detalles/:ped_cab_id',getPedidoDetalleByIdCabecera);
router.post('/pedidos/detalles',CreatePedidoDetalle)
//Login
//SubidaImagenes
//JWT

module.exports = router;