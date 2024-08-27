import { db } from "@/utils";
import { CLIENTES } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq } from 'drizzle-orm';

export async function GET(req) {
    const result = await db.select().from(CLIENTES);
    return NextResponse.json(result);
}

export async function POST(req) {
    const data = await req.json();
    const result = await db.insert(CLIENTES)
        .values({
            nombre: data?.cliente,
            direccion: data?.direccion,
            barrio: data?.barrio,
            telefono: data?.telefono
        });
    return NextResponse.json(result);
}

export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    const result = await db.delete(CLIENTES).where(eq(CLIENTES.id, id));
    return NextResponse.json(result);
}

export async function PUT(req) {
    try {
        const data = await req.json();
        const result = await db.update(CLIENTES)
            .set({
                nombre: data?.cliente,
                direccion: data?.direccion,
                barrio: data?.barrio,
                telefono: data?.telefono
            })
            .where(eq(CLIENTES.id, data?.id));
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error updating cliente:', error);
        return NextResponse.error();
    }
}