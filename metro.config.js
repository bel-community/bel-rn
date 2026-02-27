const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro config para bel-rn (repo JS independiente).
 *
 * Para conectar con el proyecto nativo bel-ios:
 *   Correr: npm start (desde este directorio)
 *   La app iOS conecta a localhost:8081 en simulador.
 *
 * Para dispositivo físico, configurar en bel-ios AppDelegate.swift:
 *   RCTBundleURLProvider.sharedSettings().jsLocation = "TU_IP:8081"
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
