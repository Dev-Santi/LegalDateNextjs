import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongoose';
import Dates from '@/models/dates';

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();

        const user = data.user;
        const date = data.date;
        const userDates = await Dates.findById(user.dates._id);
        userDates.savedDates.push(date);

        const updateResponse = await Dates.findOneAndUpdate({ _id: userDates._id }, userDates);
        return NextResponse.json(updateResponse);
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: 'Error, posiblemente usuario no logueado' },
            { status: 400 }
        );
    }
}
