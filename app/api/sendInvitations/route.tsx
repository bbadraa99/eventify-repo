import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

//to do: get the event infromation and put in the email text 
export async function POST(request: NextRequest) {
    const { emails } = await request.json();
    const subject = "Invitation to the event";
    const text = "Dear [guest_name] you are invited to the event organized by [user_name] on [event_date]. Follow this link to choose your preferences on the tasks. [link] Thank you!";
    
    // to do: create eventify email account and use it for sending invitations
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eventifyyy@gmail.com',
            pass: 'jmkhoeeooryrcbit'
        }
    });

    const mailOptions = {
        from: 'eventifyyy@gmail.com',
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
