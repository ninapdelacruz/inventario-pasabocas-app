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

function AgregarNuevaCategoria() {
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
        GlobalApi.CrearNuevaCategoria(data).then(resp => {
            console.log("--", resp);
            if (resp.data) {
                reset();
                setOpen(false);
                toast("Nueva Categoría Agregada!");
            }
            setLoading(false);
        }).catch(error => {
            console.error("Error al agregar categoría:", error);
            toast.error("Error al agregar categoría");
            setLoading(false);
        });
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Agregar Nueva Categoría</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar Nueva Categoría</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='py-3'>
                                    <label>Categoría:</label>
                                    <Input placeholder='Ex. Deditos'
                                        {...register('categoria', { required: true })} />
                                    {errors.categoria && <p className="text-red-500">Este campo es requerido</p>}
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

export default AgregarNuevaCategoria;
