import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppLayout } from './AppLayout'

describe('AppLayout', () => {
  it('renders children', () => {
    render(
      <AppLayout title="My App">
        <p>Hello world</p>
      </AppLayout>,
    )
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('renders the title in the header', () => {
    render(
      <AppLayout title="My App">
        <p>content</p>
      </AppLayout>,
    )
    expect(screen.getByText('My App')).toBeInTheDocument()
  })

  it('passes titleHref to Header', () => {
    render(
      <AppLayout title="My App" titleHref="/home">
        <p>content</p>
      </AppLayout>,
    )
    expect(screen.getByRole('link', { name: 'My App' })).toHaveAttribute('href', '/home')
  })
})
