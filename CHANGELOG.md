# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.0] - 2026-04-20

### Added
- CCO brand color tokens (`ccoColors`: skyBlue, nightBlue, sunriseOrange, duskGray)
- CCO MUI theme with Night Blue primary, Sky Blue secondary, Century Gothic typography
- CCO favicon as SVG data URI (`ccoFaviconHref`) and `FaviconLink` component
- `Header` component — Night Sky gradient AppBar with CCO logo, app title, and optional user menu with logout
- `AppLayout` — ThemeProvider + CssBaseline + Header wrapper for apps without auth
- `LoginModal` — Sky Blue stripe modal for unauthenticated state, accepts `loginUrl` or custom content
- `AppShell` — full branded shell combining Header, layout, and optional LoginModal
- CCO logo (white PNG) inlined as base64, exported as `ccoLogoSrc` and used as `Header` default logo
- `logo` prop on `Header` to override the default CCO logo
