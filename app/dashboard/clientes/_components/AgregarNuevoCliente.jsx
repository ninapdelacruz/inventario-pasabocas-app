"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
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

function AgregarNuevoCliente() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        console.log("formdata", data);
        GlobalApi.CrearNuevoCliente(data).then(resp => {
            console.log("--", resp);
            if (resp.data) {
                reset();
                setOpen(false);
                toast("Nueva Cliente Agregada!");
            }
            setLoading(false);
        }).catch(error => {
            console.error("Error al agregar Cliente:", error);
            toast.error("Error al agregar Cliente");
            setLoading(false);
        });
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Agregar Nueva Cliente</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar Nueva Cliente</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='py-3'>
                                    <label>Cliente:</label>
                                    <Input placeholder='Ex. Deditos'
                                        {...register('cliente', { required: true })} />
                                    {errors.cliente && <p className="text-red-500">Este campo es requerido</p>}
                                </div>
                                <div className='py-3'>
                                    <label>Direccion:</label>
                                    <Input placeholder='Ex. Calle 44 - Torre 24'
                                        {...register('direccion', { required: true })} />
                                    {errors.cliente && <p className="text-red-500">Este campo es requerido</p>}
                                </div>
                                <div className='py-3'>
                                    <label>Barrio/Conjunto:</label>
                                    <Input placeholder='Ex. Canario'
                                        {...register('barrio', { required: true })} />
                                    {errors.cliente && <p className="text-red-500">Este campo es requerido</p>}
                                </div>
                                <div className='py-3'>
                                    <label>Teléfono:</label>
                                    <Input placeholder='Ex. 3013121212'
                                        {...register('telefono', { required: true })} />
                                    {errors.cliente && <p className="text-red-500">Este campo es requerido</p>}
                                </div>

                                <div className='flex gap-2 items-center justify-end mt-5'>
                                    <Button type="button"
                                        onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? <LoaderIcon className='animate-spin' /> :
                                            'Save'}
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

export default AgregarNuevoCliente;
