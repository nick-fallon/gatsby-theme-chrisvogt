import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LazyLoad from './lazy-load'
import VisibilitySensor from 'react-visibility-sensor'

// Mocking VisibilitySensor to control the visibility state
jest.mock('react-visibility-sensor', () => {
  return jest.fn(({ onChange, children }) => {
    const visibilityState = { isVisible: false }
    // Call the onChange handler with the visibility state
    onChange(visibilityState.isVisible)
    return <div>{children}</div>
  })
})

describe('LazyLoad', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the placeholder initially', () => {
    render(
      <LazyLoad>
        <div data-testid="content">Lazy Loaded Content</div>
      </LazyLoad>
    )

    // Expect the placeholder to be present initially
    expect(screen.queryByTestId('content')).not.toBeInTheDocument()
  })

  it('renders the children when visible', () => {
    // Mock the visibility sensor to simulate visibility
    VisibilitySensor.mockImplementation(({ onChange, children }) => {
      onChange(true) // Simulate that the component is visible
      return <div>{children}</div>
    })

    render(
      <LazyLoad>
        <div data-testid="content">Lazy Loaded Content</div>
      </LazyLoad>
    )

    // Now the content should be visible
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })

  it('does not re-render children if already visible', () => {
    VisibilitySensor.mockImplementation(({ onChange, children }) => {
      onChange(true) // Component becomes visible
      return <div>{children}</div>
    })

    const { rerender } = render(
      <LazyLoad>
        <div data-testid="content">Lazy Loaded Content</div>
      </LazyLoad>
    )

    // The content should be visible initially
    expect(screen.getByTestId('content')).toBeInTheDocument()

    // Simulate an update where the visibility changes again to false
    VisibilitySensor.mockImplementation(({ onChange, children }) => {
      onChange(false)
      return <div>{children}</div>
    })

    rerender(
      <LazyLoad>
        <div data-testid="content">Lazy Loaded Content</div>
      </LazyLoad>
    )

    // The content should still be visible
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })
})