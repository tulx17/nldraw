// import { BiometricAuth } from "@aparajita/capacitor-biometric-auth";
// import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
// import { KeepAwake } from "@capacitor-community/keep-awake";
// import { PrivacyScreen } from "@capacitor-community/privacy-screen";
// import { SpeechRecognition } from "@capacitor-community/speech-recognition";
// import { Device } from "@capacitor/device";
import { Filesystem } from "@capacitor/filesystem";
// import { Haptics } from "@capacitor/haptics";
import { StatusBar } from "@capacitor/status-bar";
// import { Toast } from "@capacitor/toast";
// import { DocumentScanner } from "capacitor-document-scanner";

export const device = {
  // ...Device
};

export const fs = {
  stat: Filesystem.stat,
  mkdir: Filesystem.mkdir,
  readdir: Filesystem.readdir,
  writeFile: Filesystem.writeFile,
  readFile: Filesystem.readFile,
  rmdir: Filesystem.rmdir,
  deleteFile: Filesystem.deleteFile,
  checkPermissions: Filesystem.checkPermissions,
};

export const haptics = {
  // ...Haptics,
};

export const status = {
  show: StatusBar.show,
  hide: StatusBar.hide,
  getInfo: StatusBar.getInfo,
};

export const toast = {
  // ...Toast,
};

export const awake = {
  // ...KeepAwake,
};

export const privacyScreen = {
  // ...PrivacyScreen,
};

export const voice = {
  // ...SpeechRecognition,
};

export const biometric = {
  // ...BiometricAuth,
};

export const scanner = {
  // ...DocumentScanner,
  // ...BarcodeScanner,
};
