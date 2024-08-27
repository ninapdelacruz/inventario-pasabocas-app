"use client";
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';

function AgregarNuevoProducto() {
    const [open, setOpen] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        GetAllCategoriasList();
    }, []);

    const GetAllCategoriasList = () => {
        GlobalApi.GetAllCategorias().then(resp => {
            setCategorias(resp.data);
        });
    };

    const onSubmit = (data) => {
        setLoading(true);
        data.precio_compra = parseFloat(data.precio_compra);
        data.precio_venta = parseFloat(data.precio_venta);
        data.ganancia = parseFloat(data.ganancia);

        // Validación de ganancia positiva
        if (data.ganancia < 0) {
            alert('La ganancia debe ser positiva');
            setLoading(false);
            return;  // Evita el envío del formulario
        }

        console.log(data);
        GlobalApi.CrearNuevoProducto(data).then(resp => {
            console.log("producto", resp);
            if (resp.data) {
                reset();
                setOpen(false);
                toast('Nuevo Producto Agregado!');
            }
            setLoading(false);
        }).catch(error => {
            console.error("Error al agregar producto:", error);
            toast.error("Error al agregar producto");
            setLoading(false);
        });
    };

    const precioCompra = watch('precio_compra', 0);
    const precioVenta = watch('precio_venta', 0);

    useEffect(() => {
        const ganancia = precioVenta - precioCompra;
        setValue('ganancia', ganancia);
    }, [precioCompra, precioVenta, setValue]);

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>+ Agregar Nuevo Producto</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='py-3'>
                                    <label>Nombre del Producto</label>
                                    <Input placeholder='Ex. Deditos de queso x20'
                                        {...register('producto', { required: true })} />
                                    {errors.producto && <p className="text-red-500">Este campo es requerido</p>}
                                </div>
                                <div className='flex flex-col py-2'>
                                    <label>Seleccionar Categoria</label>
                                    <select className='p-3 border rounded-lg'
                                        {...register('categoria', { required: true })}>
                                        {
                                            categorias.map((item, index) => (
                                                <option key={item.id} value={item.id}>{item.categoria}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.categoria && <p className="text-red-500">Este campo es requerido</p>}
                                </div>
                                <div className='py-3'>
                                    <label>Precio de Compra</label>
                                    <Input type="number" placeholder='Ex. 20.00'
                                        {...register('precio_compra', { required: true })} />
                                    {errors.precio_compra && <p className="text-red-500">Este campo es requerido</p>}
                                </div>
                                <div className='py-3'>
                                    <label>Precio de Venta</label>
                                    <Input type="number" placeholder='Ex. 25.00'
                                        {...register('precio_venta', { required: true })} />
                                    {errors.precio_venta && <p className="text-red-500">Este campo es requerido</p>}
                                </div>
                                <div className='py-3'>
                                    <label>Ganancia</label>
                                    <Input type="number" placeholder='Ex. 5.00' readOnly
                                        {...register('ganancia', { required: true })} />
                                    {errors.ganancia && <p className="text-red-500">Este campo es requerido</p>}
                                </div>
                                <div className='flex flex-col py-2'>
                                    <label>Producto activo</label>
                                    <select className='p-3 border rounded-lg'
                                        {...register('producto_activo', { required: true })}>
                                        <option value={1}>SI</option>
                                        <option value={0}>NO</option>
                                    </select>
                                    {errors.producto_activo && <p className="text-red-500">Este campo es requerido</p>}
                                </div>
                                <div className='flex gap-2 justify-end mt-5'>
                                    <Button type="button" onClick={() => setOpen(false)} variant='ghost'>Cancel</Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? <LoaderIcon className='animate-spin' /> : 'Save'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AgregarNuevoProducto;
