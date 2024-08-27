import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from '@/components/ui/button';
import { Search, Trash, Edit } from 'lucide-react'; // Importar el icono de editar
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
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import GlobalApi from '@/app/_services/GlobalApi';
import { format } from 'date-fns';
import EditEntryDialog from './EditEntryDialog'; // Asegúrate de importar el componente

const pagination = true;
const paginationPageSize = 500;
const paginationPageSizeSelector = [25, 50, 100];

function EntradaListTable({ entradaList, refreshData }) {

    // Formateo usando date-fns
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const localDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        return format(localDate, 'dd-MM-yyyy');
    };

    // Custom cell renderer for action buttons
    const CustomButtons = (props) => {
        return (
            <div className="flex gap-2">
                <Button onClick={() => handleEdit(props.data)} variant="outline">
                    <Edit />
                </Button>
                <AlertDialog>
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
                        <AlertDialogAction onClick={() => DeleteRecord(props.data.productos.id)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        )
    };

    const [colDefs, setColDefs] = useState([
        { field: "entradas.id", headerName: "Id", filter: true },
        { field: "entradas.fecha", filter: true, valueFormatter: (params) => formatDate(params.value) },
        { field: "productos.producto", filter: true },
        { field: "entradas.cantidad", filter: true },
        { field: "productos.precio_compra", headerName: "Precio por Unidad", filter: true, valueFormatter: p => '$' + p.value.toLocaleString() },
        { field: "entradas.precio_compra_total", headerName: "Precio de Compra Total", filter: true, valueFormatter: p => '$' + p.value.toLocaleString() },
        { field: "entradas.precio_venta_total", headerName: "Precio de Venta Total", filter: true, valueFormatter: p => '$' + p.value.toLocaleString() },
        { field: "entradas.ganancia_total", headerName: "Ganancia", filter: true, valueFormatter: p => '$' + p.value.toLocaleString() },
        { field: "action", cellRenderer: CustomButtons },
    ]);

    const [rowData, setRowData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [totals, setTotals] = useState({
        totalCantidad: 0,
        totalCompra: 0,
        totalVenta: 0,
        totalGanancia: 0
    });
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentEntry, setCurrentEntry] = useState(null);

    useEffect(() => {
        if (entradaList) {
            setRowData(entradaList);
            calculateTotals(entradaList);
        }
    }, [entradaList]);

    // Function to calculate totals
    const calculateTotals = (data) => {
        const totalCantidad = data.reduce((acc, entry) => acc + (entry.entradas.cantidad || 0), 0);
        const totalCompra = data.reduce((acc, entry) => acc + (entry.entradas.precio_compra_total || 0), 0);
        const totalVenta = data.reduce((acc, entry) => acc + (entry.entradas.precio_venta_total || 0), 0);
        const totalGanancia = data.reduce((acc, entry) => acc + (entry.entradas.ganancia_total || 0), 0);

        setTotals({
            totalCantidad,
            totalCompra,
            totalVenta,
            totalGanancia
        });
    };

    const onFilterChanged = (event) => {
        const filteredRows = event.api.getModel().getRootNode().childrenAfterFilter;
        const filteredData = filteredRows.map(row => row.data);
        calculateTotals(filteredData);
    };

    const handleEdit = (entry) => {
        setCurrentEntry(entry);
        setEditDialogOpen(true);
    };

    const handleSave = (updatedEntry) => {
        GlobalApi.UpdateEntradaRecord(updatedEntry.id, updatedEntry).then(resp => {
            if (resp) {
                toast('Record updated successfully!');
                refreshData();
            }
        });
    };

    const DeleteRecord = (id) => {
        GlobalApi.DeleteEntradaRecord(id).then(resp => {
            if (resp) {
                toast('Record deleted successfully!');
                refreshData();
            }
        });
    }

    return (
        <div className='my-7'>
            <div className='mb-4'>
                <div className='flex justify-between mb-4'>
                    <div>Total Cantidad: {totals.totalCantidad}</div>
                    <div>Total Precio de Compra: ${totals.totalCompra.toLocaleString()}</div>
                    <div>Total Precio de Venta: ${totals.totalVenta.toLocaleString()}</div>
                    <div>Total Ganancia: ${totals.totalGanancia.toLocaleString()}</div>
                </div>
                <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'>
                    <Search />
                    <input type='text' placeholder='Search on Anything...'
                        className='outline-none w-full'
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </div>
                <div className="ag-theme-quartz" style={{ height: 500 }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        quickFilterText={searchInput}
                        pagination={pagination}
                        paginationPageSize={paginationPageSize}
                        paginationPageSizeSelector={paginationPageSizeSelector}
                        onFilterChanged={onFilterChanged}
                    />
                </div>
            </div>

            {currentEntry && (
                <EditEntryDialog
                    open={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    onSave={handleSave}
                    entry={currentEntry}
                />
            )}
        </div>
    );
}

export default EntradaListTable;
