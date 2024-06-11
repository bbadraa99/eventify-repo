'use client';

import { EventData } from "@/app/[createEvent_slug]/page";
import { db } from "../../firebase/config";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const fetchEventData = (slug: string) => {
    const q = doc(db, "event_test", slug);
    var [event, setEvent] = useState<EventData>({
        title: "",
        date: new Date(),
        description: "",
        template_id: 1,
        admin: "",
        guests: [],
        tasks: []
    });

    useEffect(() => {
        const fetchData = async () => {
            console.log("here1");
            const q = query(
                collection(db, "event_test"), 
                where("slug", "==", slug)
            );
            console.log("here2");
            const unsubscribe = await onSnapshot(q, (querySnapshot) => {
                console.log("here4");
                querySnapshot.forEach((doc) => {
                    setEvent(doc.data() as EventData);
                    console.log("here3");
                });
            });
            return () => unsubscribe();
        };
        fetchData();
        console.log("setting event: " + event.title);
    }, [slug]);
    

    return event;

    // const unsubscribe = onSnapshot(q,
    //     (snapshot)=> {
    //         setEvent({
    //             title: snapshot.docs[0].data().title,
    //             date: snapshot.docs[0].data().date,
    //             description: snapshot.docs[0].data().description,
    //             template_id: snapshot.docs[0].data().template_id,
    //             admin: snapshot.docs[0].data().admin,
    //             guests: snapshot.docs[0].data().guests,
    //             tasks: snapshot.docs[0].data().tasks,
    //         })
    //     }
    // )
    // console.log(event)

}

export default fetchEventData;