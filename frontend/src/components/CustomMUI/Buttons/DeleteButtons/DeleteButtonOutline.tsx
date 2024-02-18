import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'

import AddIcon from '@mui/icons-material/Delete';
import CustomButton from "../CustomButton";

const AddButtonOutline = styled(CustomButton)({
  backgroundColor: palette.lightColor,
  border: `1px solid ${palette.errorColor}`,
  color: palette.errorColor,
  ":hover": {
    backgroundColor: palette.lightColor,
    borderColor: palette.errorColor,
    filter: 'none'
  }
})

AddButtonOutline.defaultProps = {
  variant: 'outlined',
  startIcon: <AddIcon style={{fontSize: '24px'}}/>,
}

export default AddButtonOutline