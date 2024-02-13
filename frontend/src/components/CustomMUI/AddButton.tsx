import styled from "@emotion/styled";
import { Button } from "@mui/material";
import palette from './../../assets/styles/palette.module.scss'

import AddIcon from '@mui/icons-material/Add';

const AddButton = styled(Button)({
  backgroundColor: palette.themeColorTetradic2,
  color: palette.lightColor,
  fontWeight: 'bold',
  boxShadow: 'none',
  transition: 'all .1s',
  fontFamily: 'Montserrat, sans-serif',
  ":hover": {
    backgroundColor: palette.themeColorTetradic2,
    filter: "contrast(.85)"
  }
})

AddButton.defaultProps = {
  variant: 'contained',
  startIcon: <AddIcon style={{fontSize: '24px'}}/>,
}

export default AddButton