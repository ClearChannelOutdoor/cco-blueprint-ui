import { Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ccoColors } from '../theme/colors'

export interface LoginModalProps {
  open: boolean
  title: string
  onLoginClick?: () => void
  loginUrl?: string
  children?: React.ReactNode
}

const StyledBackdrop = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
  background-color: rgba(0, 0, 0, 0.6);
`

const StyledCard = styled('div')`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
`

const StyledCardHeader = styled('div')`
  background: ${ccoColors.skyBlue};
  padding: 16px 24px;
  text-align: center;
`

const StyledCardTitle = styled(Typography)`
  font-weight: 700;
  color: #ffffff;
` as typeof Typography

const StyledCardBody = styled('div')`
  padding: 32px 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
`

const Styled = {
  Backdrop: StyledBackdrop,
  Card: StyledCard,
  CardHeader: StyledCardHeader,
  CardTitle: StyledCardTitle,
  CardBody: StyledCardBody,
}
export default Styled

export function LoginModal({ open, title, loginUrl, onLoginClick, children }: LoginModalProps) {
  if (!open) return null

  const button = loginUrl ? (
    <Button variant="contained" component="a" href={loginUrl} onClick={onLoginClick}>
      Login with SSO
    </Button>
  ) : (
    <Button variant="contained" disabled>
      Login with SSO
    </Button>
  )

  return (
    <StyledBackdrop>
      <StyledCard>
        <StyledCardHeader>
          <StyledCardTitle variant="h6" component="h2">
            {title}
          </StyledCardTitle>
        </StyledCardHeader>
        <StyledCardBody>
          {button}
          {children}
        </StyledCardBody>
      </StyledCard>
    </StyledBackdrop>
  )
}
