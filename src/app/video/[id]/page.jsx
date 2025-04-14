'use client'

import DailyIframe from '@daily-co/daily-js'
import { useEffect, useRef } from 'react'

export default function VideoCallPage({ params }) {
    const videoRef = useRef()

    useEffect(() => {
        const roomUrl = new URLSearchParams(window.location.search).get('roomUrl');
        console.log("Generated Room URL:", roomUrl);
        if (!roomUrl) return;

        const callFrame = DailyIframe.createFrame(videoRef.current, {
            showLeaveButton: true,
            iframeStyle: {
                position: 'relative',
                width: '100%',
                height: '100%',
                border: 'none',
            },
        })

        console.log("call Frame", callFrame);

        callFrame.join({ url: roomUrl })
            .catch((error) => {
                console.error("Error joining call:", error);
                alert("Error joining the call. Please try again or contact support.");
            });
        return () => callFrame.leave()
    }, [])

    return (
        <div className="w-full h-screen">
            <div ref={videoRef} className="w-full h-full" />
        </div>
    )
}