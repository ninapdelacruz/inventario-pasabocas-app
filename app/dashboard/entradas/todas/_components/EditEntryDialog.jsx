import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

function EditEntryDialog({ open, onClose, onSave, entry }) {
    const [formData, setFormData] = useState(entry);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Entry</DialogTitle>
            <DialogContent>
                <TextField
                    name="cantidad"
                    label="Cantidad"
                    type="number"
                    value={formData.cantidad}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    name="precio_compra_total"
                    label="Precio de Compra Total"
                    type="number"
                    value={formData.precio_compra_total}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    name="precio_venta_total"
                    label="Precio de Venta Total"
                    type="number"
                    value={formData.precio_venta_total}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    name="ganancia_total"
                    label="Ganancia"
                    type="number"
                    value={formData.ganancia_total}
                    onChange={handleChange}
                    fullWidth
                />
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                </Button>
            </DialogContent>
        </Dialog>
    );
}
// Exportar como exportación por defecto
export default EditEntryDialog;
