import { CssBaseline, ThemeProvider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { theme } from '../theme/theme'
import { Header, HeaderProps } from './Header'

export interface AppLayoutProps extends Pick<HeaderProps, 'title' | 'titleHref' | 'renderTitle'> {
  children: React.ReactNode
}

const StyledMain = styled('main')`
  padding: 24px;
  min-height: 100vh;
`

const Styled = { Main: StyledMain }
export default Styled

export function AppLayout({ title, titleHref, renderTitle, children }: AppLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title={title} titleHref={titleHref} renderTitle={renderTitle} />
      <StyledMain>{children}</StyledMain>
    </ThemeProvider>
  )
}
