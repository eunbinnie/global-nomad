import { useEffect, useState } from 'react';

interface NaverMapProps {
  latitude: number;
  longitude: number;
}

interface LatLng {
  new (lat: number, lng: number): naver.maps.LatLng;
}

interface MapOptions {
  center: naver.maps.LatLng;
  zoom: number;
}

interface MarkerOptions {
  map: naver.maps.Map;
  position: naver.maps.LatLng;
}

interface NaverMaps {
  LatLng: LatLng;
  Map: new (element: HTMLElement, options: MapOptions) => naver.maps.Map;
  Marker: new (options: MarkerOptions) => naver.maps.Marker;
}

declare global {
  interface Window {
    naver: {
      maps?: NaverMaps;
    };
  }
}

export default function NaverMap({ latitude, longitude }: NaverMapProps) {
  const [mapLoadError, setMapLoadError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      const { maps } = window.naver;

      if (maps) {
        const latLng = new maps.LatLng(latitude, longitude);

        const mapOptions: MapOptions = {
          center: latLng,
          zoom: 15,
        };
        const map = new maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

        const markerOptions: MarkerOptions = {
          position: latLng,
          map,
        };
        // eslint-disable-next-line no-new
        new maps.Marker(markerOptions);

        const mapContainer = document.getElementById('map');
        if (mapContainer) {
          mapContainer.style.zIndex = '0';
        }
      } else {
        setMapLoadError('Naver Maps API가 로드되지 않았습니다.');
      }
    };

    const loadMap = () => {
      // 스크립트가 이미 로드되어 있고 window.naver.maps가 존재하면 바로 지도 초기화
      if (document.getElementById('naver-map-script')) {
        if (window.naver?.maps) {
          initializeMap();
        }
        return;
      }

      const script = document.createElement('script');
      script.id = 'naver-map-script';
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        initializeMap();
      };

      script.onerror = () => {
        setMapLoadError('네이버 지도 API를 로드하는 데 실패했습니다.');
      };
    };

    loadMap();
  }, [latitude, longitude]);

  return (
    <div>
      {mapLoadError ? (
        <div className="text-red-500">지도를 불러오는 중 오류가 발생했습니다: {mapLoadError}</div>
      ) : (
        <div id="map" style={{ width: '100%', height: '400px' }} className="rounded-[16px]" />
      )}
    </div>
  );
}
