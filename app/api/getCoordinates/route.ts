// app/api/getCoordinates/route.ts

import axios from 'axios';
import { NextResponse } from 'next/server';

// 네이버 Geocode API 응답 형식
interface NaverGeocodeResponse {
  addresses: {
    x: string;
    y: string;
  }[];
}

// API 라우트 핸들러
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ message: 'Address is required' }, { status: 400 });
  }

  try {
    // 네이버 Geocode API로 요청
    const response = await axios.get<NaverGeocodeResponse>('https://maps.apigw.ntruss.com/map-geocode/v2/geocode', {
      params: { query: address },
      headers: {
        'x-ncp-apigw-api-key-id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string,
        'x-ncp-apigw-api-key': process.env.NAVER_CLIENT_SECRET as string,
      },
    });

    if (response.data.addresses.length > 0) {
      const { x, y } = response.data.addresses[0];
      return NextResponse.json({ latitude: parseFloat(y), longitude: parseFloat(x) });
    }

    return NextResponse.json({ message: 'Coordinates not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching coordinates' }, { status: 500 });
  }
}
