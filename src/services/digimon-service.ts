import { configuration } from "../config/configuration";

export async function findAllDigimons() {
  const res = await fetch(`${configuration.server.url}/${configuration.server.paths.digimon}`);

  if (!res.ok) {
    throw new Error('Error fetching digimons');
  }

  return res.json();
}