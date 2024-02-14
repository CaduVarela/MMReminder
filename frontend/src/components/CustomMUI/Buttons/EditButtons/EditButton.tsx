import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'

import EditIcon from '@mui/icons-material/Edit';
import CustomButton from "../CustomButton";

const EditButton = styled(CustomButton)({
  backgroundColor: palette.themeColorAnalogous,
  color: palette.lightColor,
  ":hover": {
    backgroundColor: palette.themeColorAnalogous,
  }
})

EditButton.defaultProps = {
  variant: 'contained',
  startIcon: <EditIcon style={{fontSize: '24px'}}/>,
}

export default EditButton