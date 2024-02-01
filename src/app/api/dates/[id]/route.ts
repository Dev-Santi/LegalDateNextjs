import { connectDB } from '@/libs/mongoose';
import { NextResponse } from 'next/server';
import Dates from '@/models/dates';

type params = {
    params: { id: string };
};

export async function DELETE(req: Request, { params }: params) {
    try {
        await connectDB();

        const [paramsDate, paramsDescription] = params.id.split('qq1Rlc');

        const dates = await Dates.findOne({
            'savedDates.date': paramsDate,
        });

        const indexOfDateToDelete = dates.savedDates.findIndex((d: any) => {
            return d.date == paramsDate && d.description == paramsDescription;
        });

        dates.savedDates.splice(indexOfDateToDelete, 1);

        await Dates.findByIdAndUpdate(dates._id, dates);

        return NextResponse.json({
            savedDates: dates.savedDates,
            params: params.id,
        });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ status: 400 });
    }
}

export async function GET(req: Request, { params }: params) {
    try {
        await connectDB();

        const dates = await Dates.findById(params.id);

        return NextResponse.json({ dates: dates.savedDates });
    } catch (e) {
        return NextResponse.json(
            { message: 'Error, posiblemente usuario no logueado' },
            { status: 400 }
        );
    }
}
