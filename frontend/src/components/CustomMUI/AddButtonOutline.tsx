import styled from "@emotion/styled";
import palette from './../../assets/styles/palette.module.scss'

import AddIcon from '@mui/icons-material/Add';
import CustomButton from "./CustomButton";

const AddButtonOutline = styled(CustomButton)({
  backgroundColor: palette.lightColor,
  border: `1px solid ${palette.themeColorTetradic2}`,
  color: palette.themeColorTetradic2,
  ":hover": {
    backgroundColor: palette.lightColor,
    borderColor: palette.themeColorTetradic2,
    filter: 'none'
  }
})

AddButtonOutline.defaultProps = {
  variant: 'outlined',
  startIcon: <AddIcon style={{fontSize: '24px'}}/>,
}

export default AddButtonOutline