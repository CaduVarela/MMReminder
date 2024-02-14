import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'

import SearchIcon from '@mui/icons-material/Search';
import CustomButton from "../CustomButton";

const FilterButtonOutline = styled(CustomButton)({
  backgroundColor: palette.lightColor,
  border: `1px solid ${palette.themeColorTetradic4}`,
  color: palette.themeColorTetradic4,
  ":hover": {
    backgroundColor: palette.lightColor,
    borderColor: palette.themeColorTetradic4,
    filter: 'none'
  }
})

FilterButtonOutline.defaultProps = {
  variant: 'outlined',
  startIcon: <SearchIcon style={{fontSize: '24px'}}/>,
}

export default FilterButtonOutline