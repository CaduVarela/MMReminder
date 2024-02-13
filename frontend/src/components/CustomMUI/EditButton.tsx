import styled from "@emotion/styled";
import { Button } from "@mui/material";
import palette from './../../assets/styles/palette.module.scss'

import EditIcon from '@mui/icons-material/Edit';

const EditButton = styled(Button)({
  backgroundColor: palette.themeColorAnalogous,
  color: palette.lightColor,
  fontWeight: 'bold',
  boxShadow: 'none',
  transition: 'all .1s',
  fontFamily: 'Montserrat, sans-serif',
  ":hover": {
    backgroundColor: palette.themeColorAnalogous,
    filter: "contrast(.85)"
  }
})

EditButton.defaultProps = {
  variant: 'contained',
  startIcon: <EditIcon style={{fontSize: '24px'}}/>,
}

export default EditButton