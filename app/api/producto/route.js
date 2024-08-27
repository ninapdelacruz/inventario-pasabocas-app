import { db } from "@/utils";
import { PRODUCTOS, CATEGORIAS } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq, lt, gte, ne } from 'drizzle-orm';


export async function GET(req) {
    const result = await db.select()
    .from(PRODUCTOS)
    .leftJoin(CATEGORIAS, eq(PRODUCTOS.categoriaId, CATEGORIAS.id));

    return NextResponse.json(result);
}



export async function POST(req, res) {
    const data = await req.json();
    const result = await db.insert(PRODUCTOS)
        .values({
            producto: data?.producto,
            categoriaId: data?.categoria, // Asegúrate de que esto coincide con tu schema
            precio_compra: data?.precio_compra,
            precio_venta: data?.precio_venta,
            ganancia: data?.ganancia,
            activo: data?.producto_activo
        })
    return NextResponse.json(result);
}

export async function DELETE(req){
    const searchParams=req.nextUrl.searchParams;
    const id=searchParams.get('id');
    const result = await db.delete(PRODUCTOS).where(eq(PRODUCTOS.id, id));
    return NextResponse.json(result);
}
