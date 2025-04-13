export async function POST(req) {
    const response = await fetch('https://api.daily.co/v1/rooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
        },
        body: JSON.stringify({
            properties: {
                enable_chat: true,
                exp: Math.floor(Date.now() / 1000) + 60 * 60, // room expires in 1 hour
            },
        }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
