import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('renders children', () => {
    render(<AppShell title="My App"><p>Hello</p></AppShell>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders the app title in the header', () => {
    render(<AppShell title="My App"><p>content</p></AppShell>)
    expect(screen.getByText('My App')).toBeInTheDocument()
  })

  it('does not render a login modal when loginOpen is not provided', () => {
    render(<AppShell title="My App" loginUrl="/auth/login"><p>content</p></AppShell>)
    expect(screen.queryByRole('link', { name: /login with sso/i })).not.toBeInTheDocument()
  })

  it('shows the login modal when loginOpen is true', () => {
    render(
      <AppShell title="My App" loginOpen loginUrl="/auth/login">
        <p>content</p>
      </AppShell>,
    )
    expect(screen.getByRole('link', { name: /login with sso/i })).toBeInTheDocument()
  })

  it('hides the login modal when loginOpen is false', () => {
    render(
      <AppShell title="My App" loginOpen={false} loginUrl="/auth/login">
        <p>content</p>
      </AppShell>,
    )
    expect(screen.queryByRole('link', { name: /login with sso/i })).not.toBeInTheDocument()
  })

  it('passes user and onLogout through to Header', async () => {
    const onLogout = vi.fn()
    render(
      <AppShell title="My App" user={{ name: 'Jane Doe' }} onLogout={onLogout}>
        <p>content</p>
      </AppShell>,
    )
    await userEvent.click(screen.getByRole('button', { name: /jane doe/i }))
    await userEvent.click(screen.getByRole('menuitem', { name: /logout/i }))
    expect(onLogout).toHaveBeenCalledOnce()
  })

  it('uses a custom loginTitle in the modal', () => {
    render(
      <AppShell title="My App" loginOpen loginTitle="Welcome back" loginUrl="/auth/login">
        <p>content</p>
      </AppShell>,
    )
    expect(screen.getByText('Welcome back')).toBeInTheDocument()
  })
})
