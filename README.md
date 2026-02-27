# bel-rn

Repo React Native (JS) de la app Bel — integrado como Brownfield en el proyecto nativo iOS [`bel-ios`](../bel-ios).

## Stack

- React Native **0.76.1** · React **18.3.1** · TypeScript
- Sin React Navigation (por ahora) — la navegación raíz la maneja el nativo

---

## Cómo correr en desarrollo

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar Metro

```bash
npm start
# Metro corre en localhost:8081
```

### 3. Compilar y correr la app nativa

```bash
# En bel-ios/
open Bel.xcworkspace
# Build & Run en Xcode (⌘R) con REACT_NATIVE_TEST=1 en el scheme
```

El simulador iOS conecta automáticamente a `localhost:8081`.

---

## Estructura

```
src/
├── App.tsx                  # Componente raíz — recibe initialProps del nativo
├── screens/
│   └── HelloScreen.tsx      # Pantalla de ejemplo con props y botón close
└── native/
    └── BelBridge.ts         # Wrapper tipado del NativeModule iOS
```

---

## Cómo se comunica con iOS

### iOS → RN: pasar datos al abrir

El nativo pasa props al crear la vista:

```swift
// iOS — ReactNativeViewController.swift
let rnVC = ReactNativeViewController(
    moduleName: "BelApp",
    initialProps: ["userName": "Ana", "origin": "profile"]
)
present(rnVC, animated: true)
```

En RN, las props llegan al componente raíz registrado en `AppRegistry`:

```tsx
// App.tsx
export default function App(props: { userName?: string; origin?: string }) {
  return <HelloScreen {...props} />;
}
```

### RN → iOS: cerrar la vista

```tsx
import BelBridge from '@/native/BelBridge';

BelBridge.close(); // dispara NSNotification → iOS hace dismiss
```

Para agregar más métodos nativos, editar `BelBridgeModule.m` en `bel-ios`.

---

## Bundle para producción

```bash
# Desde bel-rn/
npx react-native bundle \
  --platform ios \
  --dev false \
  --entry-file index.js \
  --bundle-output ../bel-ios/Bel/main.jsbundle \
  --assets-dest ../bel-ios/Bel
```

Luego el `.jsbundle` se incluye en el build de Xcode.

---

## Agregar nuevas pantallas

1. Crear el componente en `src/screens/NuevaPantalla.tsx`
2. En `App.tsx`, rutear según una prop `screen`:

```tsx
export default function App({ screen, ...props }) {
  if (screen === 'nuevaPantalla') return <NuevaPantalla {...props} />;
  return <HelloScreen {...props} />;
}
```

3. Desde iOS, pasar `"screen": "nuevaPantalla"` en `initialProps`.

---

## Scripts disponibles

| Script                 | Descripción                                          |
| ---------------------- | ---------------------------------------------------- |
| `npm start`            | Levanta Metro en `localhost:8081`                    |
| `npm run lint`         | ESLint con TypeScript (0 warnings tolerados)         |
| `npm run typecheck`    | Chequeo de tipos sin emitir archivos                 |
| `npm run format`       | Reformatea todo con Prettier                         |
| `npm run format:check` | Verifica formato sin modificar archivos (útil en CI) |

---

## Prerequisitos

- **Node ≥ 18**
- **Xcode** con el proyecto `bel-ios` en la ruta `../bel-ios/`
- `npm install` antes del primer uso

---

## Repositorio nativo relacionado

Ver `bel-ios/REACT_NATIVE_SETUP.md` para documentación de la integración iOS.
