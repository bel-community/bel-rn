import React from 'react';
import HelloScreen, { HelloScreenProps } from './screens/HelloScreen';

/**
 * App raíz del repo React Native de Bel.
 *
 * Las props llegan desde el lado nativo iOS via `initialProperties`
 * en ReactNativeViewController. Ejemplo nativo:
 *
 *   ReactNativeViewController(
 *     moduleName: "BelApp",
 *     initialProps: ["userName": "Ana", "origin": "profile"]
 *   )
 */
export default function App(props: HelloScreenProps) {
  return <HelloScreen {...props} />;
}
