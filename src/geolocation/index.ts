import axios from "axios";

export default async function geolocate(ip?: string): Promise<{
  status: "success";
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}> {
  let isBrowser = typeof window !== "undefined";

  if (!isBrowser && !ip) {
    throw new Error("Please provide an IP address to geolocate");
  }

  const { data } = await axios.get(
    ip ? `https://ip-api.com/json/${ip}` : "https://ip-api.com/json"
  );

  return data;
}
