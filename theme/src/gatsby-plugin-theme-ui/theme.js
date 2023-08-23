import { tailwind } from '@theme-ui/presets'
import { merge } from 'theme-ui'

const fonts = {
  sans: '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
  serif:
    'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  mono: 'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'
}

export const floatOnHover = {
  transition: `all 200ms ease-in-out`,

  '&:hover, &:focus': {
    transform: `scale(1.015)`,
    boxShadow: `lg`
  }
}

export const cardBackgroundDark = '#252e3c'
export const pageBackgroundDark = '#2d3748'

const GradientBanner = {
  /**
   * Gradient animation created by @bibby0912.
   * Visit https://codepen.io/bibby0912/pen/mErWyA
   */
  maxWidth: `100%`,
  height: `340px`,
  border: `20px solid transparent`,
  boxSizing: `border-box`,
  padding: `1rem`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  color: `black`,

  // backgroundImage: `
  //   linear-gradient(white, white),
  //   linear-gradient(270deg, #00D7B9, #B95DD7 50%, #FFB367 100%);`,
  // backgroundRepeat: `no-repeat`,
  // backgroundOrigin: `padding-box, border-box`,
  // backgroundPosition: `0 0, 0 100%`,
  // backgroundSize: `100% 100%, 100% 200%`,
  // animation: `highlight 3s infinite alternate`,
  // textAlign: `center`,

  backgroundImage: `
  linear-gradient(white, white),
  linear-gradient(180deg, cornflowerblue, purple 50%, cornflowerblue)`,

  backgroundRepeat: `no-repeat`,
  backgroundSize: `100% 100%, 100% 200%`,
  backgroundPosition: `0 0, 0 100%`,
  backgroundOrigin: `padding-box, border-box`,
  animation: `highlight 3s infinite alternate`,

  '@keyframes highlight': {
    '100%': {
      backgroundPosition: `0 0, 0 0`
    }
  }
}

export const card = {
  backgroundColor: `var(--theme-ui-colors-panel-background)`,
  color: 'var(--theme-ui-colors-panel-text)',
  borderRadius: `3px`,
  boxShadow: `default`,
  flexGrow: 1,
  padding: 3,
  fontSize: [1, 2],
  textDecoration: `none`
}

export const metricCard = {
  backgroundColor: `var(--theme-ui-colors-panel-background)`,
  boxShadow: `none`,
  color: 'var(--theme-ui-colors-panel-text)',
  span: {
    fontFamily: `heading`,
    fontWeight: `bold`,
    padding: 2
  }
}

export const PostCard = {
  ...card,
  ...floatOnHover,
  backgroundColor: `var(--theme-ui-colors-panel-background)`,
  color: 'var(--theme-ui-colors-panel-text)',
  display: `flex`,
  height: `100%`,
  flexDirection: `column`,
  '.card-media': {
    mb: 2,
    height: `100%`,
    overflow: `hidden`
  },
  '.read-more-icon': {
    display: `inline`,
    transition: `all 250ms ease-in`,
    opacity: 0,
    paddingLeft: 0
  },
  '&:hover .read-more-icon': {
    opacity: 1,
    paddingLeft: `8px`
  }
}

export default merge(tailwind, {
  useColorSchemeMediaQuery: true,

  badges: {
    primary: {
      color: 'background',
      bg: 'primary'
    },
    outline: {
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px',
      fontSize: 1
    }
  },

  cards: {
    /* The <Card /> default style. Used when no variant is defined. */
    primary: {
      ...card
    },

    actionCard: {
      ...card,
      ...floatOnHover,
      borderBottom: `none`, // from actionCardDark
      borderLeft: theme => `3px solid ${theme.colors.primary}`,
      a: {
        ':hover': 'pointer'
      }
    },

    metricCard: {
      ...card,
      ...metricCard
    },

    /* The following styles represent specific card components, indicated in PascalCase. */

    UserProfile: {
      padding: theme => [`none`, `0 ${theme.space[3]} 0 0`],
      border: `none`,
      color: `white`,
      background: `none`
    },

    UserProfileDark: {
      ...card,
      padding: theme => [`none`, `0 ${theme.space[3]} 0 0`],
      color: `white`,
      borderBottom: `none`,
      backgroundColor: `none`,
      boxShadow: `none`
    },

    StatusCardDark: {
      backgroundColor: `#1e2530`
    },

    PostCard
  },

  colors: {
    accent: `deeppink`,
    background: `#fcfcfc`,
    'panel-background': `white`,
    'panel-divider': theme => `1px solid ${theme.colors.gray[3]}`,
    'panel-highlight': theme => theme.colors.gray[1],
    modes: {
      dark: {
        background: `#2d3748`,
        'panel-background': `#252e3c`,
        'panel-divider': theme => `1px solid ${theme.colors.gray[8]}`,
        'panel-highlight': theme => theme.colors.gray[8],
        text: `white`
      }
    },
    primary: `#1E90FF`,
    secondary: `#711E9B`,
    secondaryGradient: `linear-gradient(45deg, #4527a0 0%, #711e9b 100%)`,
    text: `#2d3748`
  },

  fonts: {
    body: fonts.serif,
    heading: fonts.sans,
    monospace: fonts.mono
  },

  fontSizes: ['0.875rem', '1rem', '1.25rem', '1.5rem', '1.875rem', '2.25rem', '3rem', '4rem', '4.5rem'],

  layout: {
    container: {
      maxWidth: [``, `94%`, ``, ``, `1440px`],
      py: [2, 3],
      px: [3, 4]
    }
  },

  links: {
    homeNavigation: {
      color: 'var(--theme-ui-colors-primary)',
      display: `block`,
      py: 2,
      textDecoration: `none`,
      '&:not(:last-of-type)': {
        borderBottom: 'var(--theme-ui-colors-panel-divider)'
      },
      '&:hover, &:focus': {
        backgroundColor: 'var(--theme-ui-colors-panel-highlight)'
      }
    }
  },

  styles: {
    root: {
      color: `text`,
      display: `flex`,
      flexDirection: `column`,
      minHeight: `100vh`,

      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },

    p: {
      fontSize: [2, 3]
    },

    ul: {
      fontSize: [2, 3]
    },

    outlined: {
      border: `4px solid #efefef`
    },

    text: {
      inverse: {
        color: `muted`
      },
      title: {
        fontFamily: 'fonts.sans'
      }
    },

    GitHubCardFooter: {
      display: `flex`,
      justifyContent: `space-between`,
      mt: 2
    },

    PageFooter: {
      backgroundColor: `#1e2530`,
      color: `light`,
      a: {
        color: `white`
      },
      width: `100%`,
      display: `block`
    },

    Book: {
      filter: theme => `drop-shadow(${theme.shadows.default})`,
      '&:hover, &:focus': {
        filter: theme => `drop-shadow(${theme.shadows.xl})`,
        transform: `scale(1.01)`,
        transition: `all .35s ease-in-out`
      }
    },

    Container: {
      py: [2, 3],
      px: [3, 4]
    },

    GradientBanner,

    GradientBannerDark: {
      ...GradientBanner,
      backgroundImage: `
        linear-gradient(#252e3c, #252e3c),
        linear-gradient(270deg, #00D7B9, #B95DD7 50%, #FFB367 100%);`,
      color: `light`
    },

    IntroExperienceSlide: {
      opacity: 0,
      height: 0,
      display: `flex`,
      visibility: `hidden`,
      '&.active-slide': {
        display: `block`,
        height: `auto`,
        opacity: 1,
        visibility: `initial`
      }
    },

    Header: {
      alignItems: `center`,
      backgroundColor: `secondary`,
      color: `white`,
      display: `block`,
      transition: `all 0.3s ease-in-out`,
      width: `100%`
    },

    InstagramItem: {
      ...floatOnHover,
      background: `none`,
      border: `none`,
      boxShadow: `md`,
      cursor: `pointer`,
      p: 0
    },

    TopNavigation: {
      color: `white`
    },

    VideoWrapper: {
      position: `relative`,
      paddingBottom: `56.25%` /* 16:9 */,
      paddingTop: `25px`,
      height: 0,
      iframe: {
        position: `absolute`,
        top: 0,
        left: 0,
        width: `100%`,
        height: `100%`
      }
    },

    WidgetFooter: {
      color: `text`,
      fontFamily: `heading`,
      textAlign: [`center`, `right`]
    },

    table: {
      width: `100%`,
      textAlign: `left`,
      th: {
        borderBottom: `1px dotted #ddd`,
        borderLeft: `1px dotted #ddd`,
        borderTop: `1px solid #ddd`,
        color: `text`,
        padding: theme => theme.space[2],
        textAlign: `left`
      },
      'tr th:first-of-type': {
        borderLeft: `1px solid #ddd`,
        borderTopLeftRadius: `8px`
      },
      'tr th:last-of-type': {
        borderRight: `1px solid #ddd`,
        borderTopRightRadius: `8px`
      },
      'tr td': {
        borderBottom: `1px dotted #ddd`,
        padding: theme => theme.space[2]
      },
      'tr:last-of-type td': {
        borderBottom: `1px solid #ddd`
      },
      'tbody tr td:first-of-type': {
        borderLeft: `1px solid #ddd`
      },
      'tbody tr td:last-of-type': {
        borderRight: `1px solid #ddd`
      }
    },

    '.footnotes': {
      fontSize: theme => theme.fontSizes[1]
    },

    '.text-center': {
      textAlign: `center`
    }
  },

  text: {
    title: {
      color: `primary`,
      fontFamily: `heading`,
      fontSize: [2, 3],
      fontWeight: `550`,
      textTransform: `uppercase`
    }
  },

  variants: {
    cards: {
      dark: {
        backgroundColor: 'teal'
      }
    }
  }
})