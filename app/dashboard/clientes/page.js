"use client"
import React, { useEffect, useState } from 'react'
import AgregarNuevoCliente from './_components/AgregarNuevoCliente';
import GlobalApi from '@/app/_services/GlobalApi';
import ClienteListTable from './_components/ClienteListTable';
//***CLIENTES***
function Cliente() {

  const [clienteList, setClienteList] = useState([]);
  useEffect(() => {
    GetAllClientes();
  },[])
   /**
   * Use to get all categories
   */
  const GetAllClientes =() => {
    GlobalApi.GetAllClientes().then(resp=>{
      setClienteList(resp.data);
    })
  }

  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between'>Clientes
        <AgregarNuevoCliente/>
        </h2>

        <ClienteListTable clienteList={clienteList}
        refreshData={GetAllClientes}/>
    </div>
  )
}

export default Cliente;