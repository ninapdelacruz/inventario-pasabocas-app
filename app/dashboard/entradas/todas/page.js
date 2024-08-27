"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_services/GlobalApi';
import EntradaListTable from './_components/EntradaListTable';

//***PRODUCTOS***

function Entrada() {
  const [entradaList, setEntradaList] = useState([])

  useEffect(() => {
    GetAllEntradas()
  },[])
   /**
   * Use to get all categories
   */
  const GetAllEntradas =() => {
    GlobalApi.GetAllEntradas().then(resp=>{
      setEntradaList(resp.data);
    })
  }
  

  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between'>Entradas

        </h2>
        <EntradaListTable entradaList={entradaList} 
        refreshData={GetAllEntradas}/>
    </div>
  )
}

export default Entrada;