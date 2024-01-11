import { NextResponse } from 'next/server';
import User from '@/models/user';
import { connectDB } from '@/libs/mongoose';

export async function GET(req: any) {
    try {
        await connectDB();

        const user = req.body;

        return NextResponse.json(user);
    } catch (e) {
        console.log(e);
        return NextResponse.json({ status: 400 });
    }
}
