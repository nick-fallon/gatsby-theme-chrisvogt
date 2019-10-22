/** @jsx jsx */
import { Header as ThemeHeader, jsx } from 'theme-ui'
import PropTypes from 'prop-types'

import SwoopBottom from './artwork/swoop-bottom'
import theme from '../gatsby-plugin-theme-ui'

const Header = ({ children, swoopFill }) => (
  <ThemeHeader>
    <div
      sx={{
        py: 5
      }}
    >
      {children}
    </div>
    <SwoopBottom fill={swoopFill} />
  </ThemeHeader>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
  swoopFill: PropTypes.string
}

Header.defaultProps = {
  swoopFill: theme.colors.primary
}

export default Header
