// app/api/resources/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const resources = await prisma.resource.findMany();
        return NextResponse.json(resources);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const resource = await prisma.resource.create({
            data: body,
        });
        return NextResponse.json(resource, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
    }
}
