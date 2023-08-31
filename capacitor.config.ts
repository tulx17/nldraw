import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "app.tulx.tldraw",
  appName: "Tldraw",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    PrivacyScreen: {
      enable: true,
    },
  },
};

export default config;
