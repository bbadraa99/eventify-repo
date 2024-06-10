import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';


interface Guest {
    name: string;
    email: string;
}
interface Organizer {
    email: string;
}

export async function POST(request: NextRequest) {
    const { guests, organizer }: { guests: Guest[], organizer: Organizer } = await request.json();
    console.log(guests);

    const subject = "Invitation to the event";
    const htmlTemplate = `
            <html>
                <body style="background-color: #f0f0eb;">
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h1 style="text-align: center;">Invitation to the event</h1>
                        <p>Dear [guest_name],</p>
                        <p>You are invited to the event organized by [user_name] on [event_date].</p>
                        <p>Follow this link to choose your preferences on the tasks: <a href="http://localhost:3000/sign-in/guest">Click here</a>.</p>
                        <p>Thank you!</p>
                    </div>
                </body>
            </html>
        `;


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eventifyyy@gmail.com',
            pass: 'jmkhoeeooryrcbit'
        }
    });

    try {
        const sendPromises = guests.map(guest => {
            const html = htmlTemplate
                .replace("[guest_name]", guest.name)
                .replace("[user_name]", organizer.email)
                .replace("[event_date]", "June 10, 2024");
            const mailOptions = {
                from: 'eventifyyy@gmail.com',
                to: guest.email,
                subject: subject,
                html: html
            };
            return transporter.sendMail(mailOptions);
        });
        await Promise.all(sendPromises);
        return NextResponse.json({ message: 'Invitations sent' });
    } catch (error) {
        return NextResponse.json({ message: 'Error sending invitations' }, { status: 500 });
    }
}
