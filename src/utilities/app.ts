import { app } from "@/utilities/capacitor";

export async function minimizeApp() {
  await app.minimize();
}
