// app/api/scripts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const scripts = await prisma.script.findMany();
        return NextResponse.json(scripts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch scripts' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const script = await prisma.script.create({
            data: body,
        });
        return NextResponse.json(script, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create script' }, { status: 500 });
    }
}
