export async function createDailyRoom() {
    try {
        const res = await fetch("https://api.daily.co/v1/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
            },
            body: JSON.stringify({
                properties: {
                    enable_chat: true,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60, // room expires in 1 hour
                },
            }),
        });

        if (!res.ok) {
            throw new Error(`Failed to create room: ${res.statusText}`);
        }

        const data = await res.json();
        return data.url;
    } catch (error) {
        console.error("Error creating Daily room:", error);
        throw new Error("Failed to create room");
    }
}
