import styled from "@emotion/styled";
import { Button } from "@mui/material";
import palette from '@assets/styles/palette.module.scss'

const HeaderButton = styled(Button)({
  backgroundColor: palette.themeColor,
  color: palette.lightColor,
  boxShadow: 'none',
  fontWeight: 'bold',

  width: '200px',
  height: '60%',

  fontSize: '20px',
  borderRadius: '24px',

  margin: '0 16px',

  transition: 'all .2s',

  ":hover": {
    boxShadow: '1 2px 2px rgba(0, 0, 0, .1)',
    backgroundColor: palette.themeColorDark,
  }
})

export default HeaderButton