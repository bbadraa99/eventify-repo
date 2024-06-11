import { EventData } from "@/app/[createEvent_slug]/page";
import { db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';

const fetchEventData = async (slug: string): Promise<NextResponse> => {
    if (!db) {
        const defaultData: EventData = {
            title: "",
            date: new Date(),
            description: "",
            template_id: 0,
            admin: "",
            guests: [],
            tasks: []
        };
        return NextResponse.json(defaultData);
    }

    try {
        console.log(slug);
        const docRef = doc(db, "event_test", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return NextResponse.json(docSnap.data() as EventData);
        } else {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export default fetchEventData;
