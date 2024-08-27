import { int, mysqlTable, varchar, boolean, decimal, foreignKey, datetime, date } from "drizzle-orm/mysql-core";

export const CATEGORIAS = mysqlTable('categorias', {
    id: int('id').primaryKey().autoincrement(),
    categoria: varchar('categoria', { length: 30 }).notNull(),
});

export const PRODUCTOS = mysqlTable('productos', {
    id: int('id').primaryKey().autoincrement(),
    producto: varchar('producto', { length: 30 }).notNull(),
    categoriaId: int('categoria_id').notNull(),
    precio_compra: int('precio_compra').notNull(),
    precio_venta: int('precio_venta').notNull(),
    ganancia: int('ganancia').notNull(),
    activo: int('activo').notNull(), 
}, (table) => {
    return {
        categoriaForeignKey: foreignKey({
            columns: [table.categoriaId],
            foreignColumns: [CATEGORIAS.id]
        })
    }
});

export const CLIENTES = mysqlTable('clientes', {
    id: int('id').primaryKey().autoincrement(),
    nombre: varchar('nombre', { length: 50 }).notNull(),
    direccion: varchar('direccion', { length: 50 }).notNull(),
    barrio: varchar('barrio', { length: 50 }).notNull(),
    telefono: int('telefono').notNull()
});

export const ENTRADAS = mysqlTable('entradas', {
    id: int('id').primaryKey().autoincrement(),
    fecha: date('fecha').notNull(),
    productoId: int('producto_id').notNull(),
    cantidad: int('cantidad').notNull(),
    precio_compra_total: int('precio_compra_total').notNull(),
    precio_venta_total: int('precio_venta_total').notNull(),
    ganancia_total: int('ganancia_total').notNull(),
}, (table) => {
    return {
        productoForeignKey: foreignKey({
            columns: [table.productoId],
            foreignColumns: [PRODUCTOS.id]
        })
    }
});