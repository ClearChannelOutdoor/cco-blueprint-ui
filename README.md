# @clearchannel/cco-blueprint-ui

CCO brand MUI theme, components, and layout primitives for TanStack Start apps at Clear Channel Outdoor.

---

## Installation

Add a `.npmrc` to your project root (gitignored) to authenticate with GitHub Packages:

```
@clearchannel:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

`GITHUB_TOKEN` must be a PAT with `read:packages` scope.

Then install:

```bash
npm install @clearchannel/cco-blueprint-ui
```

### Peer dependencies

The package requires these in your app — install them if not already present:

```bash
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
```

---

## Quick start

### AppShell (recommended)

Drop `AppShell` at the root of your app. It handles the MUI theme, header, main content area, and optional SSO login modal in one component.

```tsx
import { AppShell } from '@clearchannel/cco-blueprint-ui'

function App() {
  const { user, isAuthenticated, logout } = useAuth() // your auth logic

  return (
    <AppShell
      title="My App"
      user={user}
      onLogout={logout}
      loginOpen={!isAuthenticated}
      loginUrl="/auth/login"
    >
      <YourPageContent />
    </AppShell>
  )
}
```

### AppLayout (no auth)

For apps that don't use the login modal:

```tsx
import { AppLayout } from '@clearchannel/cco-blueprint-ui'

function App() {
  return (
    <AppLayout title="My App">
      <YourPageContent />
    </AppLayout>
  )
}
```

---

## TanStack Start integration

### Favicon

In your root route, add the CCO favicon via `head()`:

```tsx
// app/routes/__root.tsx
import { ccoFaviconHref } from '@clearchannel/cco-blueprint-ui'
import { createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'icon', type: 'image/svg+xml', href: ccoFaviconHref }],
  }),
})
```

### Emotion cache (SSR)

TanStack Start requires Emotion's `CacheProvider` for SSR hydration. Wrap your providers — keep `ThemeProvider` inside `CacheProvider`:

```tsx
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import createCache from '@emotion/cache'
import { theme } from '@clearchannel/cco-blueprint-ui'

function Providers({ children }: { children: React.ReactNode }) {
  const emotionCache = createCache({ key: 'css' })
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
```

### Vite deduplication

When using `file:` or linked packages, add `resolve.dedupe` to your `vite.config.ts` to prevent multiple React/MUI instances:

```ts
export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom', '@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
  },
  // ...
})
```

---

## API reference

### `<AppShell>`

Full branded shell with optional auth modal. Owns `ThemeProvider` + `CssBaseline`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | App title shown in header |
| `titleHref` | `string` | — | Wraps title in an `<a>` link |
| `renderTitle` | `(title: string) => ReactNode` | — | Custom title renderer (use for router links) |
| `logo` | `ReactNode` | CCO logo | Logo shown left of title; pass `null` to hide |
| `user` | `{ name: string }` | — | Shows user name + logout dropdown in header |
| `onLogout` | `() => void` | — | Called when Logout is clicked |
| `loginOpen` | `boolean` | `undefined` | `undefined` = no modal; `false` = hidden; `true` = visible |
| `loginTitle` | `string` | `'Sign in to continue'` | Modal card header text |
| `loginUrl` | `string` | — | SSO entry URL — renders login button when provided |
| `onLoginClick` | `() => void` | — | Called when login button is clicked |
| `children` | `ReactNode` | required | Page content |

### `<AppLayout>`

Lightweight shell without auth UI. Use when no login modal is needed.

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | App title |
| `titleHref` | `string` | Wraps title in an `<a>` link |
| `renderTitle` | `(title: string) => ReactNode` | Custom title renderer |
| `children` | `ReactNode` | Page content |

### `<Header>`

Standalone sticky header. Night Sky gradient, CCO logo, optional user menu.

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | App title |
| `titleHref` | `string` | Wraps title in an `<a>` |
| `renderTitle` | `(title: string) => ReactNode` | Custom title renderer |
| `logo` | `ReactNode` | Defaults to CCO logo; pass `null` to hide |
| `user` | `{ name: string }` | Shows user name + logout dropdown |
| `onLogout` | `() => void` | Called when Logout is clicked |

### `<LoginModal>`

Full-screen SSO overlay. UI only — no auth logic.

| Prop | Type | Description |
|---|---|---|
| `open` | `boolean` | Show/hide the modal |
| `title` | `string` | Card header text |
| `loginUrl` | `string` | Renders a login button linking to this URL |
| `onLoginClick` | `() => void` | Called when login button is clicked |
| `children` | `ReactNode` | Injected into card body (e.g. PASETO input) |

### Brand tokens

```ts
import { ccoColors, theme, ccoFaviconHref, ccoLogoSrc } from '@clearchannel/cco-blueprint-ui'

ccoColors.skyBlue       // '#0099D8'
ccoColors.nightBlue     // '#000434'
ccoColors.sunriseOrange // '#F6921E'
ccoColors.duskGray      // '#E6E6E6'

theme        // MUI Theme — pass to ThemeProvider if not using AppShell/AppLayout
ccoFaviconHref  // SVG data URI for <link rel="icon">
ccoLogoSrc      // PNG data URI of the CCO logo
```

---

## Local development (file: protocol)

To test changes before publishing:

```bash
# In ui-blueprint — build after each change
npm run build

# In your app — install the local package
# package.json: "@clearchannel/cco-blueprint-ui": "file:../ui-blueprint"
npm install
```

Add `resolve.dedupe` to your Vite config (see above) to avoid duplicate React instances.
