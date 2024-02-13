import styled from "@emotion/styled";
import { Button } from "@mui/material";
import palette from './../../assets/styles/palette.module.scss'

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

  ":hover": {
    boxShadow: 'none',
    backgroundColor: palette.themeColorDark,
  },
  ":selected": {
    backgroundColor: palette.themeColorDark,
  },
})

export default HeaderButton