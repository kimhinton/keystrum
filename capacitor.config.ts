import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.keystrum",
  appName: "keystrum",
  webDir: "native/out",
  backgroundColor: "#0b0b0f",
  server: {
    androidScheme: "https",
  },
  ios: {
    contentInset: "automatic",
    backgroundColor: "#0b0b0f",
  },
  android: {
    backgroundColor: "#0b0b0f",
  },
};

export default config;
