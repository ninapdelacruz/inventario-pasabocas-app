import { db } from "@/utils";
import { ENTRADAS, PRODUCTOS } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq, lt, gte, ne } from 'drizzle-orm';

export async function POST(req) {
    const { fecha, entradas } = await req.json();

    try {
        const result = await Promise.all(entradas.map(async (entrada) => {
            return await db.insert(ENTRADAS).values({
                fecha,
                productoId: entrada.productoId,
                cantidad: entrada.cantidad,
                precio_compra_total: entrada.precio_compra_total,
                precio_venta_total: entrada.precio_venta_total,
                ganancia_total: entrada.ganancia_total,
            });
        }));
        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    const result = await db.select()
    .from(ENTRADAS)
    .leftJoin(PRODUCTOS, eq(ENTRADAS.productoId, PRODUCTOS.id));

    return NextResponse.json(result);
}
