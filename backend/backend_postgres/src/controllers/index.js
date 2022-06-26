const { Pool } = require('pg');

const pool = new Pool({
    host:'ec2-52-3-200-138.compute-1.amazonaws.com',
    port:'5432',
    database:'de6nlrlaas1ebi',
    user:'sdfglfkyavqcot',
    password:'59d18c19a39a49161ab989afa53c5161b5b7a82c40923ddd699965315dfca84d',
    ssl: {
        rejectUnauthorized: false,
    }
});

// clientes
const getClientes = async (req ,res)=>{
    const response = await pool.query(`select per.per_cedula ,per.per_nombres, per.per_telefono,per.per_correo,usr.usr_estado from persona as per 
    inner join usuario
    as usr on per.usr_id = usr.usr_id and usr.usr_estado = true
    order by per.per_nombres ASC`);
    res.status(200).json(response.rows);
}

const getClienteByCedula = async (req ,res)=>{ 
    const per_cedula = req.params.per_cedula;
    const response = await pool.query('select * from persona where per_cedula= $1',[per_cedula])
    res.json(response.rows);
}

const getClienteById = async (req ,res)=>{ 
    const per_id = req.params.per_id;
    const response = await pool.query('select * from persona where per_id= $1',[per_id])
    res.json(response.rows);
}
const CreateUsuario = async (req ,res)=>{
    const {rol_id,usr_usuario,usr_clave,usr_estado} = req.body;
    const response = await pool.query('INSERT INTO usuario (rol_id, usr_usuario, usr_clave, usr_estado) VALUES ($1, $2 ,$3 ,$4)', [rol_id,usr_usuario,usr_clave,usr_estado]);
    res.json({
        message: 'Usuario Creado correctamente',
        body: {
            user: {rol_id,usr_usuario,usr_clave,usr_estado}
        }
    })
}

const ChangeStateUsuario = async (req ,res)=>{
    const usr_id = parseInt(req.params.usr_id);
    const {usr_estado} = req.body;
    const response =await pool.query('UPDATE usuario SET usr_estado=$1 WHERE usr_id=$2', [
        usr_estado,
        usr_id
    ]);
    res.json('Se ha cambiado el estado del usuario');
}

const getUsuarioById = async (req ,res)=>{ 
    const usr_id = req.params.usr_id;
    const response = await pool.query('select * from usuario where usr_id= $1',[usr_id])
    res.json(response.rows);
}

const CreateCliente = async (req ,res)=>{
    const {usr_id, per_cedula, per_nombres, per_direccion, per_telefono,per_correo, per_estadocivil, per_ciudad} = req.body;
    const response = await pool.query(`INSERT INTO persona(usr_id, per_cedula, per_nombres, per_direccion, per_telefono, 
        per_correo, per_estadocivil, per_ciudad)
        VALUES ( $1, $2, $3, $4, $5, $6, $7, $8)`, [usr_id,per_cedula,per_nombres,per_direccion,per_telefono,per_correo,per_estadocivil,per_ciudad]);
    res.json({
        message: 'Cliente Agregado correctamente',
        body: {
            user: {usr_id, per_cedula, per_nombres, per_direccion, per_telefono,per_correo, per_estadocivil, per_ciudad}
        }
    })
}

const UpdateCliente = async (req, res) => {
    const per_id = parseInt(req.params.per_id);
    const {usr_id, per_cedula, per_nombres, per_direccion, per_telefono,per_correo, per_estadocivil, per_ciudad} = req.body;
    const response = await pool.query(`UPDATE persona
	SET usr_id=$1, per_cedula=$2, per_nombres=$3, per_direccion=$4, per_telefono=$5, 
    per_correo=$6, per_estadocivil=$7, per_ciudad=$8
	WHERE per_id=$9`, [usr_id,per_cedula,per_nombres,per_direccion,per_telefono,per_correo,per_estadocivil,per_ciudad ,per_id]);
    res.json({
        message: 'Cliente Acualizado correctamente',
        body: {
            user: {usr_id, per_cedula, per_nombres, per_direccion, per_telefono,per_correo, per_estadocivil, per_ciudad}
        }
    })
}

// listar producto
const getProductos = async (req, res) => {
    const response = await pool.query('select * from producto where pro_estado=true')
    res.json(response.rows);
}
// listar producto por nombre
const getProductoByNombre = async (req, res) => { 
    const pro_nombre = req.params.pro_nombre;
    const response = await pool.query('select * from producto where pro_nombre=$1',[pro_nombre])
    res.json(response.rows);
}
// listar producto por id
const getProductoById = async (req, res) => { 
    const pro_id = req.params.pro_id;
    const response = await pool.query('select * from producto where pro_id=$1',[pro_id])
    res.json(response.rows);
}
// crear producto
const CreateProducto = async (req, res) => {
    const {cat_id, pro_nombre,pro_descripcion, pro_cantidad, pro_precio, pro_estado, codigo_prod} = req.body;
    const response = await pool.query(`INSERT INTO producto( cat_id, pro_nombre, pro_descripcion, 
    pro_cantidad, pro_precio, pro_estado, codigo_prod)VALUES ($1, $2, $3, $4, $5, $6, $7);`
    ,[cat_id, pro_nombre,pro_descripcion, pro_cantidad, pro_precio, pro_estado, codigo_prod])
    res.json({
        message: 'Producto Agregado correctamente',
        body: {
            producto:{cat_id, pro_nombre,pro_descripcion, pro_cantidad, pro_precio, pro_estado, codigo_prod}
        }
    })
}
// actualizar producto
const UpdateProducto = async (req, res) => {
    const pro_id = parseInt(req.params.pro_id);
    console.log(pro_id)
    const {cat_id, pro_nombre,pro_descripcion, pro_cantidad, pro_precio, pro_estado, codigo_prod} = req.body;
    const response = await pool.query(`UPDATE producto SET 
    cat_id=$1, pro_nombre=$2, pro_descripcion=$3, pro_cantidad=$4
    , pro_precio=$5, pro_estado=$6, codigo_prod=$7 
    WHERE pro_id=$8`,
    [cat_id, 
     pro_nombre
    ,pro_descripcion
    , pro_cantidad
    , pro_precio
    , pro_estado
    , codigo_prod
     ,pro_id])
     res.json({
        message: 'Producto Acualizado correctamente',
        body: {
            producto: {cat_id,pro_nombre,pro_descripcion,pro_cantidad,pro_precio, pro_estado, codigo_prod}
        }
    })
}
// eliminar producto
const DeleteProducto = async (req, res) => {
    const pro_id = parseInt(req.params.pro_id);
    const response = await pool.query('UPDATE producto SET pro_estado=false WHERE pro_id=$1'
    ,[ pro_id])
    res.json({
        message: 'Producto Eliminado correctamente',
        body: {
            producto:{pro_id}
        }
    })
}



//Listar todas las cabeceras
const getPedidosCabecera = async (req, res) => {
    const response = await pool.query('select * from pedido_cabecera')
    res.json(response.rows);
}
// obtener pedido por codigo
const getPedidosCabeceraById = async (req, res) => {
    const ped_cab_id = req.params.ped_cab_id;
    const response = await pool.query('select * from pedido_cabecera where ped_cab_id=$1',[ped_cab_id])
    res.json(response.rows);
}
// obtener pedido por fecha
const getPedidosCabeceraByDate = async (req, res) => {
    const ped_cab_fecha = req.params.ped_cab_fecha;
    const response = await pool.query('select * from pedido_cabecera where ped_cab_fecha=$1',[ped_cab_fecha])
    res.json(response.rows);
}

// crear pedido

const CreatePedidoCabecera = async (req, res) => {
    const {per_id, ped_cab_codigo, ped_cab_fecha, ped_cab_subtotal, ped_cab_iva, ped_cab_total} = req.body;
    const response = await pool.query(`INSERT INTO public.pedido_cabecera(
        per_id, ped_cab_codigo, ped_cab_fecha, ped_cab_subtotal, ped_cab_iva, ped_cab_total)
           VALUES ($1, $2, $3, $4, $5, $6);`
    ,[per_id, ped_cab_codigo, ped_cab_fecha, ped_cab_subtotal, ped_cab_iva, ped_cab_total])
    res.json({
        message: 'Cabecera creada correctamente',
        body: {
            cabecera:{per_id, ped_cab_codigo, ped_cab_fecha, ped_cab_subtotal, ped_cab_iva, ped_cab_total}
        }
    })
}


// obtener detalle por codigoCabecera
const getPedidoDetalleByIdCabecera = async (req, res) => {
    const ped_cab_id = req.params.ped_cab_id;
    const response = await pool.query('select * from pedido_detalle where ped_cab_id=$1',[ped_cab_id])
    res.json(response.rows);
}
// crear detalle
const CreatePedidoDetalle = async (req, res) => {
    const {pro_id, ped_cab_id, ped_det_cant, ped_det_unitario, ped_det_total} = req.body;
    const response = await pool.query(`INSERT INTO public.pedido_detalle(pro_id, ped_cab_id, ped_det_cant, ped_det_unitario, ped_det_total)
	VALUES ($1, $2, $3, $4, $5);`
    ,[pro_id, ped_cab_id, ped_det_cant, ped_det_unitario, ped_det_total])
    res.json({
        message: 'Detalle creado correctamente',
        body: {
            detalle:{pro_id, ped_cab_id, ped_det_cant, ped_det_unitario, ped_det_total}
        }
    })
}
// crear una ruta para el login
const Login = async (req, res) => { 
    const usr_usuario = req.params.usr_usuario;
    const usr_clave = req.params.usr_clave;
    const response = await pool.query('SELECT * FROM usuario where usr_usuario=$1 and usr_clave=$2 and usr_estado=true;',[usr_usuario,usr_clave])
    res.json({
        message: true
    })

}
//crear subida de imagen


module.exports ={
    getClientes,
    getClienteByCedula,
    CreateUsuario,
    ChangeStateUsuario,
    getUsuarioById,
    CreateCliente,
    getClienteById,
    UpdateCliente,
    getProductos,
    getProductoById,
    getProductoByNombre,
    CreateProducto,
    UpdateProducto,
    DeleteProducto,
    getPedidosCabecera,
    getPedidosCabeceraById,
    getPedidosCabeceraByDate,
    CreatePedidoCabecera,
    getPedidoDetalleByIdCabecera,
    CreatePedidoDetalle,
    Login,


}