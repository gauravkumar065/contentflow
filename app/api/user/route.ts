import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized } from "@/utils/data/user/isAuthorized";

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId'); // Updated line

    if (!userId || typeof userId !== 'string') {
        return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }

    try {
        const { authorized, message, data } = await isAuthorized(userId);
        console.log("Logger -> handler -> authorized, message, data:", authorized, message, data)

        if (!authorized) {
            return NextResponse.json({ error: message }, { status: 403 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error in user API route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}