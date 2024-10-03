// app/api/ai-contents/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const aiContents = await prisma.aIContent.findMany();
        return NextResponse.json(aiContents);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch AI contents' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const aiContent = await prisma.aIContent.create({
            data: body,
        });
        return NextResponse.json(aiContent, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create AI content' }, { status: 500 });
    }
}
