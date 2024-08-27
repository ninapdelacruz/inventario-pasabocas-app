const { default: axios } = require("axios");

const GetAllCategorias=()=>axios.get('/api/categoria');
const CrearNuevaCategoria=(data)=>axios.post('/api/categoria', data);
const DeleteCategoriaRecord=(id)=>axios.delete('/api/categoria?id='+id)

const CrearNuevoProducto=(data)=>axios.post('/api/producto', data);
const GetAllProductos=()=>axios.get('/api/producto');
const DeleteProductoRecord=(id)=>axios.delete('/api/producto?id='+id)


const GetAllClientes=()=>axios.get('/api/cliente');
const CrearNuevoCliente=(data)=>axios.post('/api/cliente', data);
const DeleteClienteRecord=(id)=>axios.delete('/api/cliente?id='+i);
const UpdateCliente = (id, data) => axios.put('/api/cliente', { id, ...data });

const GetAllEntradas=()=>axios.get('/api/entrada');
const CrearNuevaEntrada=(data)=>axios.post('/api/entrada', data);
const DeleteEntradaRecord=(id)=>axios.delete('/api/entrada?id='+id);



export default{
    GetAllCategorias,
    CrearNuevaCategoria, 
    DeleteCategoriaRecord, 
    
    CrearNuevoProducto,
    GetAllProductos, 
    DeleteProductoRecord,
    
    GetAllClientes,
    CrearNuevoCliente,
    DeleteClienteRecord,
    UpdateCliente,

    GetAllEntradas,
    CrearNuevaEntrada,
    DeleteEntradaRecord,





    
   //GetAllStudents,
    //DeleteStudentRecord
}