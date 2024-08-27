"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ComboboxDemo({ products, onSelectProduct }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [filteredProducts, setFilteredProducts] = React.useState(products);

  // Filtrar productos según la búsqueda
  const handleSearch = (searchTerm) => {
    setFilteredProducts(
      products.filter((product) =>
        product.producto.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleSelect = (selectedValue) => {
    const selectedProduct = products.find(
      (product) => product.id.toString() === selectedValue
    );
    setValue(selectedProduct ? selectedProduct.producto : "");
    setOpen(false);
    onSelectProduct(selectedProduct);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value || "Seleccionar Producto"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Buscar producto..."
            onValueChange={handleSearch}
          />
          <CommandList>
            {filteredProducts.length > 0 ? (
              <CommandGroup>
                {filteredProducts.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.id.toString()}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === product.id.toString()
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {product.producto}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No products found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
