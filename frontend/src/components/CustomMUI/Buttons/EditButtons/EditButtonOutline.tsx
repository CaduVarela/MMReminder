import styled from "@emotion/styled";
import palette from '@assets/styles/palette.module.scss'

import EditIcon from '@mui/icons-material/Edit';
import CustomButton from "../CustomButton";

const EditButtonOutline = styled(CustomButton)({
  backgroundColor: palette.lightColor,
  border: `1px solid ${palette.themeColorAnalogous}`,
  color: palette.themeColorAnalogous,
  ":hover": {
    backgroundColor: palette.lightColor,
    borderColor: palette.themeColorAnalogous,
    filter: 'none'
  }
})

EditButtonOutline.defaultProps = {
  variant: 'outlined',
  startIcon: <EditIcon style={{fontSize: '24px'}}/>,
}

export default EditButtonOutline