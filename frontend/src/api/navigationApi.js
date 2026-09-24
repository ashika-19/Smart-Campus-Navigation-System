const BASE_URL = "/api";

export async function fetchLocations(query = "") {
  const res = await fetch(
    `${BASE_URL}/locations${query ? `?q=${encodeURIComponent(query)}` : ""}`,
  );
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json();
}

export async function fetchRoute(from, to, algorithm = "astar") {
  const res = await fetch(
    `${BASE_URL}/route?from=${from}&to=${to}&algorithm=${algorithm}`,
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to fetch route");
  }
  return res.json();
}

export async function fetchMultiStopRoute(from, stops) {
  const res = await fetch(`${BASE_URL}/route/multi-stop`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from, stops }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to fetch multi-stop route");
  }
  return res.json();
}
