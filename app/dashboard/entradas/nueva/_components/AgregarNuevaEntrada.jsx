import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import GlobalApi from "@/app/_services/GlobalApi";
import { ComboboxDemo } from "@/components/ui/ComboboxDemo";

function EntradasPage() {
    const [fecha, setFecha] = useState(dayjs().format("YYYY-MM-DD"));
    const [productos, setProductos] = useState([]);
    const [entradas, setEntradas] = useState([]);
    const [totalCompra, setTotalCompra] = useState(0);
    const [totalVenta, setTotalVenta] = useState(0);
    const [totalGanancia, setTotalGanancia] = useState(0);

    // Obtener productos desde la API al cargar la página
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await GlobalApi.GetAllProductos();
                console.log("Respuesta de la API:", response);
                setProductos(response.data.map(item => item.productos)); 
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        };

        obtenerProductos();
    }, []);

    const agregarEntrada = () => {
        setEntradas([...entradas, { producto: null, productoId: null, cantidad: 0, precio_compra: 0, precio_venta: 0, ganancia: 0 }]);
    };

    const manejarCambioProducto = (index, product) => {
        console.log("Producto seleccionado ID:", product.id);
        const productoSeleccionado = productos.find(producto => producto.id === product.id);
        console.log("Producto seleccionado:", productoSeleccionado);

        if (productoSeleccionado) {
            const nuevasEntradas = [...entradas];
            nuevasEntradas[index].productoId = productoSeleccionado.id;
            nuevasEntradas[index].producto = productoSeleccionado.producto; // Añadimos el nombre del producto
            nuevasEntradas[index].precio_compra = productoSeleccionado.precio_compra;
            nuevasEntradas[index].precio_venta = productoSeleccionado.precio_venta;
            nuevasEntradas[index].ganancia = productoSeleccionado.ganancia;

            // Actualizar precios y ganancias totales
            nuevasEntradas[index].precio_compra_total = nuevasEntradas[index].cantidad * nuevasEntradas[index].precio_compra;
            nuevasEntradas[index].precio_venta_total = nuevasEntradas[index].cantidad * nuevasEntradas[index].precio_venta;
            nuevasEntradas[index].ganancia_total = nuevasEntradas[index].cantidad * nuevasEntradas[index].ganancia;

            setEntradas(nuevasEntradas);

            setTotalCompra(nuevasEntradas.reduce((acc, entrada) => acc + entrada.precio_compra_total, 0));
            setTotalVenta(nuevasEntradas.reduce((acc, entrada) => acc + entrada.precio_venta_total, 0));
            setTotalGanancia(nuevasEntradas.reduce((acc, entrada) => acc + entrada.ganancia_total, 0));
        }
    };

    const manejarCambioCantidad = (index, cantidad) => {
        const nuevasEntradas = [...entradas];
        nuevasEntradas[index].cantidad = parseInt(cantidad) || 0;
        nuevasEntradas[index].precio_compra_total = nuevasEntradas[index].cantidad * nuevasEntradas[index].precio_compra;
        nuevasEntradas[index].precio_venta_total = nuevasEntradas[index].cantidad * nuevasEntradas[index].precio_venta;
        nuevasEntradas[index].ganancia_total = nuevasEntradas[index].cantidad * nuevasEntradas[index].ganancia;

        setTotalCompra(nuevasEntradas.reduce((acc, entrada) => acc + entrada.precio_compra_total, 0));
        setTotalVenta(nuevasEntradas.reduce((acc, entrada) => acc + entrada.precio_venta_total, 0));
        setTotalGanancia(nuevasEntradas.reduce((acc, entrada) => acc + entrada.ganancia_total, 0));

        setEntradas(nuevasEntradas);
    };

    const guardarEntradas = async () => {
        console.log("Guardando entradas...");
        console.log("Fecha:", fecha);
        console.log("Entradas a guardar:", entradas);

        try {
            const response = await fetch('/api/entrada', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fecha, entradas }),
            });
            console.log("Respuesta del servidor:", response);

            if (response.ok) {
                console.log("Entradas guardadas exitosamente.");
            }
        } catch (error) {
            console.error("Error guardando las entradas:", error);
        }
    };

    return (
        <div className="p-7">
            <h2 className="font-bold text-2xl">Entradas de Productos</h2>

            <div className="my-4">
                <label>Fecha de Entrada:</label>
                <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>

            {entradas.map((entrada, index) => (
                <div key={index} className="flex gap-4 mb-4">
                    <ComboboxDemo
                        products={productos}
                        onSelectProduct={(product) => manejarCambioProducto(index, product)}
                        selectedProduct={entrada.producto ? { id: entrada.productoId, producto: entrada.producto } : null} // Pasar el producto seleccionado
                    />
                    <Input
                        type="number"
                        placeholder="Cantidad"
                        value={entrada.cantidad}
                        onChange={(e) => manejarCambioCantidad(index, e.target.value)}
                    />
                    <div>Precio de Compra: {entrada.precio_compra_total}</div>
                    <div>Precio de Venta: {entrada.precio_venta_total}</div>
                    <div>Ganancia: {entrada.ganancia_total}</div>
                </div>
            ))}

            <Button onClick={agregarEntrada}>Añadir Producto</Button>

            <div className="my-4">
                <div>Total Precio de Compra: {totalCompra}</div>
                <div>Total Precio de Venta: {totalVenta}</div>
                <div>Total Ganancia: {totalGanancia}</div>
            </div>

            <Button onClick={guardarEntradas}>Guardar Entradas</Button>
        </div>
    );
}

export default EntradasPage;
