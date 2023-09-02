import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "io.tulx.nldraw",
  appName: "Nldraw",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    // PrivacyScreen: {
    //   enable: true,
    // },
  },
};

export default config;
