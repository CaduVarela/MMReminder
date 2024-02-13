import styled from "@emotion/styled";
import { Button } from "@mui/material";
import palette from './../../assets/styles/palette.module.scss'

import SearchIcon from '@mui/icons-material/Search';

const FilterButton = styled(Button)({
  backgroundColor: palette.themeColorTetradic4,
  color: palette.lightColor,
  fontWeight: 'bold',
  boxShadow: 'none',
  transition: 'all .1s',
  fontFamily: 'Montserrat, sans-serif',
  ":hover": {
    backgroundColor: palette.themeColorTetradic4,
    filter: "contrast(.85)"
  }
})

FilterButton.defaultProps = {
  variant: 'contained',
  startIcon: <SearchIcon style={{fontSize: '24px'}}/>,
}

export default FilterButton