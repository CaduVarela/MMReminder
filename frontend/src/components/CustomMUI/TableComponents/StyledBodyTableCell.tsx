import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'
import { TableCell } from "@mui/material";

const StyledBodyTableCell = styled(TableCell)({
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 'medium',
  fontSize: '16px',
  color: palette.cardDarkColor,
})

export default StyledBodyTableCell