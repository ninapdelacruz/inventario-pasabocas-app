import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Button } from '@/components/ui/button';
import { Search, Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import GlobalApi from '@/app/_services/GlobalApi';
  

const pagination = true;
const paginationPageSize = 500;
const paginationPageSizeSelector = [25, 50, 100];

function ProductoListTable({ productoList, refreshData }) {

    const CustomButtons = (props) => {
        return (<AlertDialog>
            <AlertDialogTrigger><Button variant="destructive"><Trash /></Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your record
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>DeleteRecord(props?.data?.productos?.id)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          )
        
    }

    const [colDefs, setColDefs] = useState([
        { field: "productos.id", headerName: "Id", filter: true },
        { field: "productos.producto", filter: true },
        { field: "productos.precio_compra", headerName: "Precio de Compra", filter: true, valueFormatter: p => '$' + p.value.toLocaleString() },
        { field: "productos.precio_venta", headerName: "Precio de Venta", filter: true },
        { field: "productos.ganancia", headerName: "Ganancia", filter: true },
        { field: "categorias.categoria", headerName: "Categoria", filter: true },

        {
            field: "productos.activo",
            headerName: "Estado",
            filter: true,
            valueFormatter: (params) => params.value === 1 ? "ACTIVO" : "INACTIVO"
        },
        { field: "action", cellRenderer: CustomButtons },

    ]);
    const [rowData, setRowData] = useState();
    const [searchInput, setSearchInput] = useState()


    useEffect(() => {
        productoList && setRowData(productoList)
    }, [productoList])

    const DeleteRecord=(id)=>{
        GlobalApi.DeleteProductoRecord(id).then(resp=>{
            if(resp){
                toast('Record deleted successfully!')
                refreshData()
            }
        })
    }

    return (
        <div className='my-7'>
            <div
                className="ag-theme-quartz" // applying the Data Grid theme
                style={{ height: 500 }} // the Data Grid will fill the size of the parent container
            >
                <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'>
                    <Search />
                    <input type='text' placeholder='Search on Anything...'
                        className='outline-none w-full'
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </div>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    quickFilterText={searchInput}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                /> </div>
        </div>
    )
}

export default ProductoListTable