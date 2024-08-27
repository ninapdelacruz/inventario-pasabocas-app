import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from '@/components/ui/button';
import { Search, Trash, Edit } from 'lucide-react';
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
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import EditClientDialog from './editclientdialog';

const pagination = true;
const paginationPageSize = 500;
const paginationPageSizeSelector = [25, 50, 100];

function ClienteListTable({ clienteList, refreshData }) {
    // Definición de CustomButtons
    const CustomButtons = (props) => {
        return (
            <div>
                <EditClientDialog client={props.data} onUpdate={() => refreshData()} />
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="destructive">
                            <Trash />
                        </Button>
                    </AlertDialogTrigger>
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
                            <AlertDialogAction onClick={() => DeleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        );
    };

    const [colDefs, setColDefs] = useState([
        { field: "id", filter: true },
        { field: "nombre", filter: true },
        { field: "direccion", filter: true },
        { field: "barrio", filter: true },
        { field: "telefono", filter: true },
        { field: "action", cellRenderer: CustomButtons },
    ]);

    const [rowData, setRowData] = useState();
    const [searchInput, setSearchInput] = useState();

    useEffect(() => {
        clienteList && setRowData(clienteList);
    }, [clienteList]);

    const DeleteRecord = (id) => {
        GlobalApi.DeleteClienteRecord(id).then(resp => {
            if (resp) {
                toast('Record deleted successfully!');
                refreshData();
            }
        });
    };

    return (
        <div className='my-7'>
            <div
                className="ag-theme-quartz"
                style={{ height: 500 }}
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
                />
            </div>
        </div>
    );
}

export default ClienteListTable;
