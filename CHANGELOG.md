# Changelog

## 0.53.0

### ✨ Features

- **Configurable Social Profiles**: Decoupled social profiles from theme to site metadata for better reusability
  - Removed hardcoded `social-profiles.json` containing personal information
  - Added configurable `socialProfiles` array to theme configuration with sensible defaults
  - Updated GraphQL schema to support social profiles in site metadata
  - Modified `use-social-profiles` hook to read from site metadata instead of JSON file
  - Each site can now configure its own social media profiles independently

### 🔄 Configuration Changes

- **Theme Configuration**: Added default social profiles (GitHub, Twitter, Instagram, LinkedIn) to theme-config.js
- **Site Configurations**:
  - **chrisvogt.me**: Configured with full social profile set (7 platforms)
  - **chronogrove.com**: Configured with minimal profiles (Twitter, Instagram, LinkedIn)

### ⚠️ Breaking Changes

- **Social Profiles**: Sites using this theme must now configure social profiles in their `gatsby-config.js`
  - Add `socialProfiles` array to theme options' `siteMetadata`
  - See migration guide in PR for configuration examples
  - Theme provides sensible defaults to prevent complete breakage

### 🧪 Testing

- Updated all tests to work with new social profiles implementation
- Maintained 100% code coverage on all changed files
- All 494 tests continue to pass

## 0.52.1

### 🐛 Bug Fixes

- **Instagram Widget**: Fixed "Show More" button to only appear when there are actually more images to display
  - Button now only renders when there are more than 8 images available
  - Prevents confusing UX for users with small image collections (≤8 images)
  - "Show Less" functionality continues to work correctly when expanded

### 🧪 Testing

- Added test coverage for button visibility logic with different image counts
- Updated existing tests to work with new conditional button rendering
- All 180 widget tests continue to pass

## 0.52.0

### ✨ Features

- **Blog Page Template in Theme**: Moved blog page template from personal site to theme for reusability
  - Relocated `blog.js` and `blog.spec.js` from `www.chrisvogt.me/src/pages/` to `theme/src/pages/`
  - Updated import paths to be relative to theme directory
  - All sites using the theme now get a consistent blog page implementation

- **Shadowable Blog Page SEO**: Implemented shadowable Head export pattern for blog page SEO customization
  - Blog page Head export moved to separate `blog-head.js` file for independent shadowing
  - Theme provides generic SEO using site metadata with sensible fallbacks
  - Sites can now customize blog SEO without duplicating entire page implementation
  - Added shadow examples for both `www.chrisvogt.me` and `www.chronogrove.com`

### 🔧 Technical Improvements

- **Better Theme Architecture**: Improved separation of concerns between page logic and SEO metadata
- **Enhanced Reusability**: Sites inherit page updates automatically while maintaining custom SEO
- **Future-Proof Pattern**: Establishes pattern for shadowable components across other pages

### 🧪 Testing

- Fixed blog.spec.js import paths to use relative theme paths
- Added blog-head component mock for proper test coverage
- All existing blog page tests continue to pass

### 📚 Breaking Changes

None. This change is fully backward compatible - existing sites will automatically use the generic SEO from the theme.

## 0.51.0

### Bug Fixes

- **Fixed failing unit tests**: Resolved GraphQL errors in test environment by properly mocking `useNavigationData` hook
- **Fixed navigation data handling**: Updated `useNavigationData` hook to return empty object when navigation data is missing, matching test expectations
- **Improved test reliability**: Added proper mocking for Gatsby's `useStaticQuery` and `graphql` in component tests

### Technical Improvements

- Enhanced test coverage for navigation components
- Improved error handling in navigation data hooks
- Better separation of concerns between theme and site-specific configuration

## 0.50.0 🌗

- Renamed the project from gatsby-theme-chrisvogt to gatsby-theme-chronogrove.
- This is a ½ marker towards a full release.

## 0.47.0

- Adds support for Spotify to the audio player component that renders at the bottom of the page.

## 0.46.1

- Fixes the recently-played Steam games table so that it reports down to the minute, instead of rounding hours up or down (_e.g._, "0 hours" played).

## 0.46.0

- Replaces Google Books API book descriptions with Goodreads book descriptions.
- Adds support for `<i>`, `<b>`, and `<br />` elements in widget content response.

## 0.45.3

– Rearranges the page header layout to accommodate longer menu items.

## 0.45.2

— Splits the Home page content out into a new About Me page at /about/.

## 0.45.1

### Performance Improvements

- **Fixed animated background freezing during window resize**: Resolved critical performance issue that caused page freezing and crashes when resizing the browser window or opening DevTools
- **Optimized resize event handling**: Added 100ms debounce to prevent excessive resize event calls
- **Reduced rendering overhead**: Decreased animated circle count from 80 to 40 for better performance
- **Improved canvas sizing**: Replaced expensive `document.body.scrollHeight` calculations with faster `window.innerHeight`
- **Enhanced memory management**: Added proper animation cleanup with `cancelAnimationFrame`

### Technical Details

- Implemented conditional canvas resizing (only when dimensions actually change)
- Added circle repositioning logic to maintain bounds after resize
- All existing functionality preserved with no breaking changes

## 0.45.0

- Adds a new "Skip to content" link for keyboard-first visitors, allowing them to TAB once on the page and then skip to the <main> content.

## 0.44.4

- Updates Steam widget "Recently-Played Games" to reflect MINUTES for games played.

## 0.44.0

- Updates themed <table/> elements to have a light and dark mode.

## 0.43.0

- Adds a new Owned Games section to the Steam widget, using data added to metrics.chrisvogt.me via [chrisvogt/metrics#57](https://github.com/chrisvogt/metrics/pull/57).

### Notes

- The current <Table/> styles don't have a dark mode.
