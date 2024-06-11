import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { EventData } from "@/app/createEvent/[slug]/page";

// Assuming EventData is correctly defined elsewhere
export const FetchEventData = (slug: string) => {
    const [event, setEvent] = useState<EventData>(
        {
            title: "",
            date: new Date(),
            description: "",
            template_id: 0,
            admin: "",
            guests: [],
            tasks: [],
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "event_test", slug);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setEvent(docSnap.data() as EventData);
            } else {
                console.log("No such document!");
            }
        };

        fetchData();
    }, [slug]);

    return event;
};