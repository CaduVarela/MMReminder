import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'
import { TableContainer } from "@mui/material";

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: palette.cardLightColor,
  borderRadius: '8px',
  border: `1px solid ${palette.lightColorShade}`
})

export default StyledTableContainer