import { CssBaseline, ThemeProvider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { theme } from '../theme/theme'
import { Header, HeaderProps } from './Header'
import { LoginModal } from './LoginModal'

export interface AppShellProps
  extends Pick<HeaderProps, 'title' | 'titleHref' | 'renderTitle' | 'user' | 'onLogout'> {
  loginOpen?: boolean
  loginTitle?: string
  loginUrl?: string
  onLoginClick?: () => void
  children: React.ReactNode
}

const StyledMain = styled('main')`
  padding: 24px;
  min-height: 100vh;
`

const Styled = { Main: StyledMain }
export default Styled

export function AppShell({
  title,
  titleHref,
  renderTitle,
  user,
  onLogout,
  loginOpen,
  loginTitle = 'Sign in to continue',
  loginUrl,
  onLoginClick,
  children,
}: AppShellProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        title={title}
        titleHref={titleHref}
        renderTitle={renderTitle}
        user={user}
        onLogout={onLogout}
      />
      <StyledMain>{children}</StyledMain>
      {loginOpen !== undefined && (
        <LoginModal
          open={loginOpen}
          title={loginTitle}
          loginUrl={loginUrl}
          onLoginClick={onLoginClick}
        />
      )}
    </ThemeProvider>
  )
}
