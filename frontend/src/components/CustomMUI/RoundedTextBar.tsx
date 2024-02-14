import styled from "@emotion/styled";
import { InputBase } from "@mui/material";
import palette from './../../assets/styles/palette.module.scss'

const RoundedTextBar = styled(InputBase)({
  backgroundColor: palette.lightColor,
  
  border: `1px solid ${palette.cardLightGray}`,
  borderRadius: '24px',

  minWidth: '240px',

  padding: '5px 0',

  transition: 'all .1s ease-in',

  "& .MuiInputBase-input": {
    fontFamily: '"Montserrat", sans-serif',

    margin: '0 16px',

    color: palette.cardDarkColor 
  },

  "&::placeholder": {
    fontWeight: 'bold',
  },

  ":hover": {
    borderColor: palette.cardDarkColor,
  },

  ":focus-within": {
    borderColor: palette.themeColorTetradic4,
  }
})

RoundedTextBar.defaultProps = {
  
}

export default RoundedTextBar