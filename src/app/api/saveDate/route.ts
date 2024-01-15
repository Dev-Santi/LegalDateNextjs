export const fetchCache = 'force-no-store';

import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongoose';
import User from '@/models/user';

export async function PUT(req: Request) {
    try {
        await connectDB();
        const data = await req.json();

        const user = data.user;
        const date = data.date;
        const userFound: any = await User.findById(user._id);

        userFound.savedDates.push(date);

        const updateResponse = await User.findOneAndUpdate({ _id: user._id }, userFound);
        return NextResponse.json(updateResponse);
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: 'Error, posiblemente usuario no logueado' },
            { status: 400 }
        );
    }
}
