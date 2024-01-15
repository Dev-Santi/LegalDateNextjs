export const fetchCache = 'force-no-store';

import { NextResponse } from 'next/server';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import { connectDB } from '@/libs/mongoose';

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        await connectDB();
        const userFound = await User.findOne({ email: email });
        if (userFound) {
            return NextResponse.json({ message: 'Usuario ya existe' }, { status: 400 });
        }

        if (password.length >= 6) {
            const hashedPass = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                name,
                password: hashedPass,
            });

            const newUser = await user.save();
            return NextResponse.json({ message: newUser });
        } else {
            return NextResponse.json(
                { message: 'Contraseña demasiado corta' },
                { status: 400 }
            );
        }
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            return NextResponse.json(
                {
                    message: e.message,
                },
                {
                    status: 500,
                }
            );
        }
    }
}
