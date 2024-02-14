import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'
import { TableContainer } from "@mui/material";

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: palette.cardLightColor,
  borderRadius: '8px 8px 0 0',
  border: `1px solid ${palette.lightColorShade}`
})

export default StyledTableContainer