import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'

import SearchIcon from '@mui/icons-material/Search';
import CustomButton from "../CustomButton";

const FilterButton = styled(CustomButton)({
  backgroundColor: palette.themeColorTetradic4,
  color: palette.lightColor,
  ":hover": {
    backgroundColor: palette.themeColorTetradic4,
  }
})

FilterButton.defaultProps = {
  variant: 'contained',
  startIcon: <SearchIcon style={{fontSize: '24px'}}/>,
}

export default FilterButton