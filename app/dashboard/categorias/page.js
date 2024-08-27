"use client"
import React, { useEffect, useState } from 'react'
import AgregarNuevaCategoria from './_components/AgregarNuevaCategoria';
import GlobalApi from '@/app/_services/GlobalApi';
import CategoriaListTable from './_components/CategoriaListTable';
//***CATEGORIAS***
function Categoria() {

  const [categoriaList, setCategoriaList] = useState([]);
  useEffect(() => {
    GetAllCategorias();
  },[])
   /**
   * Use to get all categories
   */
  const GetAllCategorias =() => {
    GlobalApi.GetAllCategorias().then(resp=>{
      setCategoriaList(resp.data);
    })
  }

  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between'>Categorías
        <AgregarNuevaCategoria/>
        </h2>

        <CategoriaListTable categoriaList={categoriaList}
        refreshData={GetAllCategorias}/>
    </div>
  )
}

export default Categoria;