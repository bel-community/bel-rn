import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import BelBridge from '../native/BelBridge';

/**
 * Props que el lado nativo puede pasar al abrir esta pantalla.
 * Se configuran en `ReactNativeViewController` via `initialProperties`.
 */
export interface HelloScreenProps {
  /** Nombre del usuario para personalizar el saludo */
  userName?: string;
  /** Contexto desde donde se abrió la vista (ej: "profile", "home") */
  origin?: string;
}

export default function HelloScreen({ userName, origin }: HelloScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>React Native</Text>
        </View>

        {/* Contenido */}
        <Text style={styles.title}>
          {userName ? `¡Hola, ${userName}!` : '¡Hola desde React Native!'}
        </Text>

        <Text style={styles.subtitle}>Esta pantalla corre 100% en RN.</Text>

        {origin ? <Text style={styles.pill}>Abierta desde: {origin}</Text> : null}

        {/* CTA principal */}
        <View style={styles.spacer} />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => BelBridge.close()}
          activeOpacity={0.8}
        >
          <Text style={styles.closeButtonText}>← Volver a nativo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  badge: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  badgeText: {
    color: '#0077CC',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  pill: {
    fontSize: 13,
    color: '#999',
    backgroundColor: '#F5F5F5',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  spacer: {
    flex: 1,
    maxHeight: 60,
  },
  closeButton: {
    backgroundColor: '#111',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
