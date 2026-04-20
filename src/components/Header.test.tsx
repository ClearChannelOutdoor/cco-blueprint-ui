import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material/styles'
import { Header } from './Header'
import { theme } from '../theme/theme'

const wrap = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('Header', () => {
  it('renders the title text', () => {
    wrap(<Header title="My App" />)
    expect(screen.getByText('My App')).toBeInTheDocument()
  })

  it('renders title as an anchor when titleHref is provided', () => {
    wrap(<Header title="My App" titleHref="/home" />)
    const link = screen.getByRole('link', { name: 'My App' })
    expect(link).toHaveAttribute('href', '/home')
  })

  it('calls renderTitle with the title string', () => {
    const renderTitle = vi.fn((t: string) => <span data-testid="custom">{t}</span>)
    wrap(<Header title="My App" renderTitle={renderTitle} />)
    expect(renderTitle).toHaveBeenCalledWith('My App')
    expect(screen.getByTestId('custom')).toBeInTheDocument()
  })

  it('uses renderTitle over titleHref when both are provided', () => {
    const renderTitle = vi.fn((t: string) => <span data-testid="custom">{t}</span>)
    wrap(<Header title="My App" titleHref="/home" renderTitle={renderTitle} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByTestId('custom')).toBeInTheDocument()
  })

  it('does not render a user menu when user prop is absent', () => {
    wrap(<Header title="My App" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders user name button when user prop is provided', () => {
    wrap(<Header title="My App" user={{ name: 'Jane Doe' }} />)
    expect(screen.getByRole('button', { name: /jane doe/i })).toBeInTheDocument()
  })

  it('calls onLogout when Logout menu item is clicked', async () => {
    const onLogout = vi.fn()
    wrap(<Header title="My App" user={{ name: 'Jane Doe' }} onLogout={onLogout} />)
    await userEvent.click(screen.getByRole('button', { name: /jane doe/i }))
    await userEvent.click(screen.getByRole('menuitem', { name: /logout/i }))
    expect(onLogout).toHaveBeenCalledOnce()
  })
})
