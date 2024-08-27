import { db } from "@/utils";
import { CATEGORIAS } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq, lt, gte, ne } from 'drizzle-orm';

export async function GET(req){
    const result =await db.select().from(CATEGORIAS);
    return NextResponse.json(result);
}

export async function POST(req, res){
    const data=await req.json();
    const result=await db.insert(CATEGORIAS)
    .values({
        categoria: data?.categoria
    })
    return NextResponse.json(result);
}
export async function DELETE(req){
    const searchParams=req.nextUrl.searchParams;
    const id=searchParams.get('id');
    console.log(id);
    const result = await db.delete(CATEGORIAS).where(eq(CATEGORIAS.id, id));
    return NextResponse.json(result);
}
