import { createTheme } from '@mui/material/styles'
import { ccoColors } from './colors'

const headingFont = "'Century Gothic', 'Futura', 'Trebuchet MS', sans-serif"
const headingBase = { fontFamily: headingFont, fontWeight: 700 }

export const theme = createTheme({
  palette: {
    primary: {
      main: ccoColors.skyBlue,
      dark: ccoColors.nightBlue,
    },
    secondary: {
      main: ccoColors.sunriseOrange,
    },
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
    h1: { ...headingBase, fontSize: '2.5rem' },
    h2: { ...headingBase, fontSize: '2rem' },
    h3: { ...headingBase, fontSize: '1.75rem' },
    h4: { ...headingBase, fontSize: '1.5rem' },
    h5: { ...headingBase, fontSize: '1.25rem' },
    h6: { ...headingBase, fontSize: '1.125rem' },
  },
})
