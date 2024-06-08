import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    const { emails } = await request.json();
    const subject = "Hello";
    const text = "This is a test email";

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aibekminbaev04@gmail.com',
            pass: 'xjztlntivpzaguyt'
        }
    });

    const mailOptions = {
        from: 'aibekminbaev04@gmail.com',
        subject: subject,
        text: text
    };

    try {
        const sendPromises = emails.map((email: string) =>
            transporter.sendMail({ ...mailOptions, to: email })
        );
        await Promise.all(sendPromises);
        return NextResponse.json({ message: 'Invitations sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Error sending invitations' }, { status: 500 });
    }
}
