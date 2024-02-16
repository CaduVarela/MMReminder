import styled from "@emotion/styled";
import { InputBase, TextField } from "@mui/material";
import palette from './../../assets/styles/palette.module.scss'

const StyledInputField = styled(InputBase)({

  font: 'Montserrat, sans-serif',

  marginTop: '5px',
  padding: '8px 16px',

  border: `1px solid ${palette.cardLightGray}`,
  borderRadius: '8px',
  width: 20,

  ":hover": {
    boxShadow: `1px 1px 8px ${palette.cardDarkColor}40`
  },

  ":focus-within": {
    borderColor: palette.cardDarkColor,
    boxShadow: `1px 1px 8px ${palette.cardDarkColor}40`,
  },

  "&.Mui-error": {
    border: "1px solid",
    borderColor: palette.warningColor
  }
})

StyledInputField.defaultProps = {
}

export default StyledInputField