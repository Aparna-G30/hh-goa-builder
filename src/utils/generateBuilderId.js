export default function generateBuilderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let id = "";

  for (let i = 0; i < 5; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }

  return `HH26-${id}`;
}