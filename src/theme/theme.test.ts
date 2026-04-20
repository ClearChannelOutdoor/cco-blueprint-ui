import { describe, it, expect } from 'vitest'
import { theme } from './theme'
import { ccoColors } from './colors'

describe('theme', () => {
  it('sets primary.main to skyBlue', () => {
    expect(theme.palette.primary.main).toBe(ccoColors.skyBlue)
  })
  it('sets primary.dark to nightBlue', () => {
    expect(theme.palette.primary.dark).toBe(ccoColors.nightBlue)
  })
  it('sets secondary.main to sunriseOrange', () => {
    expect(theme.palette.secondary.main).toBe(ccoColors.sunriseOrange)
  })
  it('uses system font stack for body fontFamily', () => {
    expect(theme.typography.fontFamily).toContain('-apple-system')
  })
  it('sets h1 fontWeight to 700', () => {
    expect((theme.typography as Record<string, unknown>)['h1']).toMatchObject({
      fontWeight: 700,
    })
  })
  it('sets h1 fontFamily to include Century Gothic', () => {
    const h1 = (theme.typography as Record<string, unknown>)['h1'] as Record<string, unknown>
    expect(String(h1.fontFamily)).toContain('Century Gothic')
  })
})
