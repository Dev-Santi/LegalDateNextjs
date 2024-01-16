import { connectDB } from '@/libs/mongoose';
import { NextResponse } from 'next/server';
import Dates from '@/models/dates';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const dates = await Dates.findById(params.id);

        return NextResponse.json({ savedDates: dates.savedDates });
    } catch (e) {
        return NextResponse.json(
            { message: 'Error, posiblemente usuario no logueado' },
            { status: 400 }
        );
    }
}
