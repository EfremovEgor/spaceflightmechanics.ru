export const DEG = Math.PI / 180;

/** RUDN University main building, from the venue map on the Contact page. */
export const VENUE = { lat: 55.652052, lon: 37.499574 };

/**
 * Lat/lon in degrees to a point on a sphere. Longitude 0 faces +z, north is +y,
 * east is +x, so the globe reads correctly from the default camera.
 */
export function latLonToXYZ(
	lat: number,
	lon: number,
	radius = 1,
): [number, number, number] {
	const la = lat * DEG;
	const lo = lon * DEG;
	return [
		radius * Math.cos(la) * Math.sin(lo),
		radius * Math.sin(la),
		radius * Math.cos(la) * Math.cos(lo),
	];
}

/** Approximate institution locations, keyed by the country named in a committee affiliation. */
export const COUNTRY_COORDS: Record<string, { lat: number; lon: number }> = {
	Russia: VENUE,
	India: { lat: 18.52, lon: 73.86 },
	Brazil: { lat: -23.18, lon: -45.89 },
	China: { lat: 31.23, lon: 121.47 },
	Malaysia: { lat: 2.99, lon: 101.71 },
	UAE: { lat: 24.45, lon: 54.38 },
	Nigeria: { lat: 9.08, lon: 7.4 },
	Ethiopia: { lat: 9.03, lon: 38.74 },
	France: { lat: 48.86, lon: 2.35 },
	Italy: { lat: 45.07, lon: 7.69 },
	Canada: { lat: 43.65, lon: -79.38 },
	Israel: { lat: 32.78, lon: 35.02 },
	Korea: { lat: 37.57, lon: 126.98 },
	USA: { lat: 40.79, lon: -77.86 },
	Germany: { lat: 52.52, lon: 13.4 },
};

export const countryOf = (affiliation: string) =>
	affiliation.split(",").at(-1)!.trim();

/** Midpoint of the great circle between two points, used to frame an arc. */
export function greatCircleMid(
	a: { lat: number; lon: number },
	b: { lat: number; lon: number },
) {
	const [ax, ay, az] = latLonToXYZ(a.lat, a.lon);
	const [bx, by, bz] = latLonToXYZ(b.lat, b.lon);
	const x = ax + bx;
	const y = ay + by;
	const z = az + bz;
	const len = Math.hypot(x, y, z) || 1;
	return {
		lat: Math.asin(y / len) / DEG,
		lon: Math.atan2(x / len, z / len) / DEG,
	};
}

export function formatCoord(lat: number, lon: number) {
	const ns = lat >= 0 ? "N" : "S";
	const ew = lon >= 0 ? "E" : "W";
	return `${Math.abs(lat).toFixed(3)}°${ns} ${Math.abs(lon).toFixed(3)}°${ew}`;
}
