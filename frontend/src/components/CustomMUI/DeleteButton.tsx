import styled from "@emotion/styled";
import { Button } from "@mui/material";
import palette from './../../assets/styles/palette.module.scss'

import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = styled(Button)({
  backgroundColor: palette.themeColor,
  color: palette.lightColor,
  fontWeight: 'bold',
  boxShadow: 'none',
  transition: 'all .1s',
  fontFamily: 'Montserrat, sans-serif',
  ":hover": {
    backgroundColor: palette.themeColor,
    filter: "contrast(.85)"
  }
})

DeleteButton.defaultProps = {
  variant: 'contained',
  startIcon: <DeleteIcon style={{fontSize: '24px'}}/>,
}

export default DeleteButton