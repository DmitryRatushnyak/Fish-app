// Where are we fishing? GPS from the phone, turned into a readable name with
// OpenStreetMap's free Nominatim service. Both are optional: typing a name works too.

export function here() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('no-gps'));
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: +p.coords.latitude.toFixed(5), lng: +p.coords.longitude.toFixed(5) }),
      reject,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  });
}

export async function placeName({ lat, lng }, lang = 'nl') {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=16&lat=${lat}&lon=${lng}&accept-language=${lang}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return shortName(await res.json());
  } catch {
    return null;
  }
}

// "Noordkade, Alblasserdam" rather than the full postal address.
export function shortName(result) {
  const a = result?.address ?? {};
  const spot = a.water ?? a.river ?? a.canal ?? a.park ?? a.road ?? a.neighbourhood ?? a.suburb;
  const town = a.village ?? a.town ?? a.city ?? a.municipality;
  return [spot, town].filter(Boolean).join(', ') || result?.name || null;
}

export const mapLink = ({ lat, lng }) => `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
