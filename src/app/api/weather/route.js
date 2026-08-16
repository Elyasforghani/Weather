
import { NextResponse } from 'next/server';

const API_KEY = process.env.WEATHERAPI_KEY; // stored server-side only

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('q');

  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no&days=7`
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}