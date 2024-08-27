import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export function ComboboxDemo({ products, onSelectProduct, selectedProduct }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false); // Estado para controlar la apertura del Popover

    useEffect(() => {
        setFilteredProducts(
            products.filter((product) =>
                product.producto.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, products]);

    const handleProductSelect = (product) => {
        onSelectProduct(product);
        setIsPopoverOpen(false); // Cierra el Popover después de seleccionar un producto
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                    {selectedProduct ? selectedProduct.producto : "Seleccionar Producto"}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Input
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto mt-2">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleProductSelect(product)}
                            >
                                {product.producto}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-gray-500">No hay productos disponibles</div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
