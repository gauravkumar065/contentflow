// app/api/ideas/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const ideas = await prisma.idea.findMany();
        return NextResponse.json(ideas);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch ideas' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("Logger -> POST -> body:", body)
        const idea = await prisma.idea.create({
            data: body,
        });
        return NextResponse.json(idea, { status: 201 });
    } catch (error) {
        console.log("Logger -> POST -> error:", error)
        return NextResponse.json({ error: 'Failed to create idea' }, { status: 500 });
    }
}