"use client";
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
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
import { Edit, LoaderIcon } from 'lucide-react';

function EditClientDialog({ client, onUpdate }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (client) {
            reset({
                cliente: client.nombre,
                direccion: client.direccion,
                barrio: client.barrio,
                telefono: client.telefono
            });
        }
    }, [client, reset]);

    const onSubmit = (data) => {
        setLoading(true);
        GlobalApi.UpdateCliente(client.id, data).then(resp => {
            if (resp.data) {
                setOpen(false);
                toast("Cliente actualizado con éxito!");
                onUpdate(); // Refresh data after update
            }
            setLoading(false);
        }).catch(error => {
            console.error("Error al actualizar Cliente:", error);
            toast.error("Error al actualizar Cliente");
            setLoading(false);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button variant="outline" size="sm"><Edit /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Cliente</DialogTitle>
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
                                {errors.direccion && <p className="text-red-500">Este campo es requerido</p>}
                            </div>
                            <div className='py-3'>
                                <label>Barrio/Conjunto:</label>
                                <Input placeholder='Ex. Canario'
                                    {...register('barrio', { required: true })} />
                                {errors.barrio && <p className="text-red-500">Este campo es requerido</p>}
                            </div>
                            <div className='py-3'>
                                <label>Teléfono:</label>
                                <Input placeholder='Ex. 3013121212'
                                    {...register('telefono', { required: true })} />
                                {errors.telefono && <p className="text-red-500">Este campo es requerido</p>}
                            </div>

                            <div className='flex gap-2 items-center justify-end mt-5'>
                                <Button type="button" onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? <LoaderIcon className='animate-spin' /> : 'Save'}
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default EditClientDialog;
