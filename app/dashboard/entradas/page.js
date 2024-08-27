"use client"
import React from 'react'
import AgregarNuevaEntrada from './_components/AgregarNuevaEntrada';

function Entrada() {
  return (
    <div>
        <h2 className='font-bold text-2xl flex justify-between'>Entradas
        <AgregarNuevaEntrada/>
        </h2>
    </div>
  )
}

export default Entrada