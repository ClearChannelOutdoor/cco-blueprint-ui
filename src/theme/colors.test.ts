import { describe, it, expect } from 'vitest'
import { ccoColors } from './colors'

describe('ccoColors', () => {
  it('exports skyBlue as #0099D8', () => {
    expect(ccoColors.skyBlue).toBe('#0099D8')
  })
  it('exports nightBlue as #000434', () => {
    expect(ccoColors.nightBlue).toBe('#000434')
  })
  it('exports sunriseOrange as #F6921E', () => {
    expect(ccoColors.sunriseOrange).toBe('#F6921E')
  })
  it('exports duskGray as #E6E6E6', () => {
    expect(ccoColors.duskGray).toBe('#E6E6E6')
  })
})
