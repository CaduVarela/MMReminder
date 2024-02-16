import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'
import { CircularProgress } from "@mui/material";

const StyledCircularProgress = styled(CircularProgress)({
  color: palette.themeColorTetradic3,

  display: 'flex'
})

StyledCircularProgress.defaultProps = {
  size: 80,
  thickness: 3
}

export default StyledCircularProgress