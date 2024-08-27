"use client"
import React from 'react'
import AgregarNuevaEntrada from './_components/AgregarNuevaEntrada';

function Entrada() {
  return (
    <div>
        <h2 className='font-bold text-2xl flex justify-between'>Entradas de Productos
        
        </h2>
        <AgregarNuevaEntrada/>
    </div>
  )
}

export default Entrada