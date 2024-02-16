import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'

import CachedIcon from '@mui/icons-material/Cached';
import CustomButton from "../CustomButton";

const RefreshButtonOutline = styled(CustomButton)({
  backgroundColor: palette.lightColor,
  border: `1px solid ${palette.themeColorTetradic3}`,
  color: palette.themeColorTetradic3,
  ":hover": {
    backgroundColor: palette.lightColor,
    borderColor: palette.themeColorTetradic3,
    filter: 'none'
  }
})

RefreshButtonOutline.defaultProps = {
  variant: 'outlined',
  startIcon: <CachedIcon style={{fontSize: '24px'}}/>,
}

export default RefreshButtonOutline