import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'

import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from "../CustomButton";

const DeleteButton = styled(CustomButton)({
  backgroundColor: palette.errorColor,
  color: palette.lightColor,
  ":hover": {
    backgroundColor: palette.errorColor,
  }
})

DeleteButton.defaultProps = {
  variant: 'contained',
  startIcon: <DeleteIcon style={{fontSize: '24px'}}/>,
}

export default DeleteButton