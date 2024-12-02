import React from 'react'
import { render, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import AnimatedBackground, { Circle } from './animated-background'

// Mock requestAnimationFrame and cancelAnimationFrame
beforeEach(() => {
  jest.useFakeTimers()
  window.requestAnimationFrame = jest.fn(callback => setTimeout(callback, 16)) // Simulate 60fps
  window.cancelAnimationFrame = jest.fn(id => clearTimeout(id))
})

afterEach(() => {
  jest.clearAllMocks()
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

// Mock the Canvas and its 2D context
const mockGetContext = jest.fn(() => ({
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  closePath: jest.fn(),
  createRadialGradient: jest.fn(() => ({
    addColorStop: jest.fn()
  })),
  fillStyle: '',
  globalAlpha: 1.0
}))

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: mockGetContext
  })
})

describe('AnimatedBackground', () => {
  it('renders the canvas and overlay div correctly', () => {
    render(<AnimatedBackground />)

    const canvasElement = document.querySelector('canvas')
    expect(canvasElement).toBeInTheDocument()

    const overlayDiv = canvasElement.nextElementSibling
    expect(overlayDiv).toBeInTheDocument()
    expect(overlayDiv).toHaveStyle('background-color: rgba(75, 0, 130, 0.02)')
  })

  it('sets up and tears down window resize event listeners', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = render(<AnimatedBackground />)

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))

    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('initializes canvas size and gradient drawing', () => {
    render(<AnimatedBackground />)

    // Manually advance the timers to trigger the animation
    act(() => {
      jest.advanceTimersByTime(32) // Advance two frames (16ms each at 60fps)
    })

    const context = mockGetContext.mock.results[0].value

    // Assert context methods are called
    expect(context.clearRect).toHaveBeenCalled()
  })

  it('uses requestAnimationFrame to animate', () => {
    render(<AnimatedBackground />)
    act(() => {
      jest.advanceTimersByTime(16)
    })
    expect(window.requestAnimationFrame).toHaveBeenCalled()
  })

  it('handles missing canvas gracefully', () => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: jest.fn(() => null)
    })

    expect(() => render(<AnimatedBackground />)).not.toThrow()

    // Restore the original getContext
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: originalGetContext
    })
  })

  it('resizes canvas on window resize', () => {
    render(<AnimatedBackground />)

    const resizeEvent = new Event('resize')
    act(() => {
      window.dispatchEvent(resizeEvent)
    })

    expect(mockGetContext).toHaveBeenCalled()
  })

  it('tests Circle class behavior', () => {
    const mockContext = {
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      closePath: jest.fn(),
      createRadialGradient: jest.fn(() => ({
        addColorStop: jest.fn()
      })),
      fillStyle: '',
      globalAlpha: 1.0
    }

    const mockCanvas = { width: 500, height: 500 }

    const testCircle = new Circle(50, 50, 20, [
      { position: 0, color: 'rgba(128, 0, 128, 1)' },
      { position: 1, color: 'rgba(128, 0, 128, 0.6)' }
    ])

    // Test draw method
    testCircle.draw(mockContext)
    expect(mockContext.beginPath).toHaveBeenCalled()
    expect(mockContext.arc).toHaveBeenCalledWith(50, 50, 20, 0, Math.PI * 2)
    expect(mockContext.fill).toHaveBeenCalled()
    expect(mockContext.closePath).toHaveBeenCalled()

    // Test update method (no collisions)
    testCircle.dx = 2
    testCircle.dy = 3
    testCircle.update(mockCanvas, mockContext)
    expect(testCircle.x).toBe(52)
    expect(testCircle.y).toBe(53)

    // Test boundary collisions
    testCircle.x = 1 // Near left edge
    testCircle.dx = -2
    testCircle.update(mockCanvas, mockContext)
    expect(testCircle.dx).toBe(2) // Reversed direction
  })
})