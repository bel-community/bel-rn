import { NativeModules, Platform } from 'react-native';

interface BelBridgeModule {
  /** Cierra la vista React Native y vuelve a la app nativa */
  close(): void;
}

const { BelBridge } = NativeModules;

if (__DEV__ && !BelBridge) {
  console.warn(
    '[BelBridge] Native module not found. ' +
      (Platform.OS === 'ios'
        ? 'Make sure BelBridgeModule is compiled in the iOS target.'
        : 'Make sure BelBridgeModule.kt está compilado en el módulo Android ' +
          'y BelBridgePackage está registrado en BelReactNativeHost.'),
  );
}

export default {
  /**
   * Cierra la Activity/ViewController de React Native y vuelve al nativo.
   *
   * iOS:    NotificationCenter → ReactNativeViewController.dismiss()
   * Android: RnCloseChannel   → ReactNativeActivity.finish()
   */
  close: () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      BelBridge?.close();
    }
  },
} as BelBridgeModule;
