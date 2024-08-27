"use client"
import React, { useEffect, useState } from 'react'
import AgregarNuevoProducto from './_components/AgregarNuevoProducto';
import GlobalApi from '@/app/_services/GlobalApi';
import ProductoListTable from './_components/ProductoListTable';

//***PRODUCTOS***

function Producto() {
  const [productoList, setProductoList] = useState([])

  useEffect(() => {
    GetAllProductos()
  },[])
   /**
   * Use to get all categories
   */
  const GetAllProductos =() => {
    GlobalApi.GetAllProductos().then(resp=>{
      setProductoList(resp.data);
    })
  }
  

  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between'>Productos
        <AgregarNuevoProducto/>
        </h2>
        <ProductoListTable productoList={productoList} 
        refreshData={GetAllProductos}/>
    </div>
  )
}

export default Producto;