import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { LoginModal } from './LoginModal'
import { theme } from '../theme/theme'

const wrap = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('LoginModal', () => {
  it('renders nothing when open is false', () => {
    wrap(<LoginModal open={false} title="Sign in" />)
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument()
  })

  it('renders the card title when open is true', () => {
    wrap(<LoginModal open title="Sign in" />)
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('renders a link button when loginUrl is provided', () => {
    wrap(<LoginModal open title="Sign in" loginUrl="/auth/login" />)
    const btn = screen.getByRole('link', { name: /login with sso/i })
    expect(btn).toHaveAttribute('href', '/auth/login')
  })

  it('renders a disabled button when loginUrl is absent', () => {
    wrap(<LoginModal open title="Sign in" />)
    expect(screen.getByRole('button', { name: /login with sso/i })).toBeDisabled()
  })

  it('calls onLoginClick when the button is clicked', () => {
    const onLoginClick = vi.fn()
    wrap(<LoginModal open title="Sign in" loginUrl="/auth/login" onLoginClick={onLoginClick} />)
    fireEvent.click(screen.getByRole('link', { name: /login with sso/i }))
    expect(onLoginClick).toHaveBeenCalledOnce()
  })

  it('renders children inside the card body', () => {
    wrap(
      <LoginModal open title="Sign in">
        <span data-testid="child">extra content</span>
      </LoginModal>,
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
