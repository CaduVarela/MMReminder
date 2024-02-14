import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'
import { TableRow } from "@mui/material";

const StyledTableRow = styled(TableRow)({
  borderColor: palette.lightColorShade,

  '&:nth-of-type(odd)': {
    backgroundColor: `#F2F2F2`,
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
})

export default StyledTableRow