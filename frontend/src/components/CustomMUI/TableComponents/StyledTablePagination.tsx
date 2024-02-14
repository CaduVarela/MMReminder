import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'
import { TablePagination } from "@mui/material";

const StyledTablePagination = styled(TablePagination)({
  width: '95%',
  height: '40px',
  margin: '-1px auto 0',
  display: 'flex',
  justifyContent: 'right',
  alignItems: 'center',
  border: '1px solid ' + palette.lightColorShade,
  borderTop: '1px solid ' + palette.cardLightGray + '80',
  borderRadius: '0 0 8px 8px',
  backgroundColor: palette.cardLightColor,
  boxShadow: `0px 0px 8px ${palette.cardDarkColor}10`,
  overflow: 'hidden',
})

export default StyledTablePagination