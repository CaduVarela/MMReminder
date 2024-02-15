import { Box, styled } from "@mui/material";
import palette from '@assets/styles/palette.module.scss'

const padding = '32px';

const PopupBox = styled(Box)({
  // width: `calc(60vw - ${padding} * 2)`,
  width: 'max-content',
  minWidth: `calc(400px - ${padding} * 2)`,
  maxWidth: `calc(704px - ${padding} * 2)`,

  // height: `calc(60vh - ${padding} * 2)`,
  height: 'max-content',
  // minHeight: `calc(400px - ${padding} * 2)`,
  maxHeight: '85vh',

  padding: padding,

  borderRadius: '13px',

  backgroundColor: palette.lightColor,
  boxShadow: `1px 1px 16px ${palette.darkColor}40`,

  overflow: 'scroll',
})

export default PopupBox