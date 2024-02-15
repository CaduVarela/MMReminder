import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'
import { TablePagination } from "@mui/material";

const StyledTablePagination = styled(TablePagination)({
  margin: '-1px auto 0',
  border: '1px solid ' + palette.lightColorShade,
  borderTop: '1px solid ' + palette.cardLightGray + '80',
  backgroundColor: palette.cardLightColor,
  boxShadow: `0px 0px 8px ${palette.cardDarkColor}10`,
  overflow: 'hidden',
  columnSpan: 'all'
})

export default StyledTablePagination