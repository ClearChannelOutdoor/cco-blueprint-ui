import { useState } from 'react'
import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { styled } from '@mui/material/styles'
import { ccoColors } from '../theme/colors'
import ccoLogoSrc from '../assets/CCO_logo_CMYK_Icon_KO.png'

export { ccoLogoSrc }

export interface HeaderProps {
  title: string
  titleHref?: string
  renderTitle?: (title: string) => React.ReactNode
  logo?: React.ReactNode
  user?: { name: string }
  onLogout?: () => void
}

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(135deg, ${ccoColors.nightBlue} 0%, ${ccoColors.skyBlue} 100%);
  position: sticky;
  top: 0;
`

const StyledTitleLink = styled('a')`
  color: #ffffff;
  font-weight: 700;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const StyledTitleText = styled(Typography)`
  font-weight: 700;
  color: #ffffff;
` as typeof Typography

const StyledLogoImg = styled('img')`
  height: 32px;
  width: auto;
  margin-right: 12px;
  display: block;
`

const StyledUserButton = styled(Button)`
  margin-left: auto;
  color: rgba(255, 255, 255, 0.85);
  text-transform: none;
  font-size: 0.875rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
` as typeof Button

const defaultLogo = <StyledLogoImg src={ccoLogoSrc} alt="Clear Channel Outdoor" />

const Styled = {
  AppBar: StyledAppBar,
  TitleLink: StyledTitleLink,
  TitleText: StyledTitleText,
  UserButton: StyledUserButton,
  LogoImg: StyledLogoImg,
}
export default Styled

export function Header({ title, titleHref, renderTitle, logo = defaultLogo, user, onLogout }: HeaderProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

  const titleContent = renderTitle
    ? renderTitle(title)
    : titleHref
      ? <StyledTitleLink href={titleHref}>{title}</StyledTitleLink>
      : <StyledTitleText variant="h6" component="span">{title}</StyledTitleText>

  return (
    <StyledAppBar>
      <Toolbar>
        {logo}
        {titleContent}
        {user && (
          <>
            <StyledUserButton
              onClick={(e) => setMenuAnchor(e.currentTarget)}
              endIcon={<ArrowDropDownIcon />}
            >
              {user.name}
            </StyledUserButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem
                onClick={() => {
                  setMenuAnchor(null)
                  onLogout?.()
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  )
}
