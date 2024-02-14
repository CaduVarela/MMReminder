import styled from "@emotion/styled";
import palette from './../../assets/styles/palette.module.scss'

import AddIcon from '@mui/icons-material/Add';
import CustomButton from "./CustomButton";

const AddButton = styled(CustomButton)({
  backgroundColor: palette.themeColorTetradic2,
  color: palette.lightColor,
  ":hover": {
    backgroundColor: palette.themeColorTetradic2,
  }
})

AddButton.defaultProps = {
  variant: 'contained',
  startIcon: <AddIcon style={{fontSize: '24px'}}/>,
}

export default AddButton