import { describe, it, expect } from 'vitest'
import { ccoFaviconHref, FaviconLink } from './favicon'

describe('ccoFaviconHref', () => {
  it('is a valid SVG data URI', () => {
    expect(ccoFaviconHref).toMatch(/^data:image\/svg\+xml,/)
  })

  it('encodes Night Blue and Sky Blue brand colors', () => {
    const decoded = decodeURIComponent(ccoFaviconHref.replace('data:image/svg+xml,', ''))
    expect(decoded).toContain('#000434')
    expect(decoded).toContain('#0099D8')
  })
})

describe('FaviconLink', () => {
  it('renders a link element with rel="icon"', () => {
    const element = FaviconLink()
    expect(element).not.toBeNull()
    expect(element.type).toBe('link')
    expect(element.props.rel).toBe('icon')
    expect(element.props.type).toBe('image/svg+xml')
    expect(element.props.href).toMatch(/^data:image\/svg\+xml,/)
  })
})
