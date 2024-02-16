import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'

import CachedIcon from '@mui/icons-material/Cached';
import CustomButton from "../CustomButton";

const RefreshButton = styled(CustomButton)({
  backgroundColor: palette.themeColorTetradic3,
  color: palette.lightColor,
  ":hover": {
    backgroundColor: palette.themeColorTetradic3,
  }
})

RefreshButton.defaultProps = {
  variant: 'contained',
  startIcon: <CachedIcon style={{fontSize: '24px'}}/>,
}

export default RefreshButton