import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'
import { TableCell } from "@mui/material";

const StyledHeadTableCell = styled(TableCell)({
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 'bold',
  fontSize: '18px',
  color: palette.cardDarkColor,
})

export default StyledHeadTableCell