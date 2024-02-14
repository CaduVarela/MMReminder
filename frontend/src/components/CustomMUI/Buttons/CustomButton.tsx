import styled from "@emotion/styled";
import { Button } from "@mui/material";

const CustomButton = styled(Button)({
  fontWeight: 'bold',
  boxShadow: 'none',
  transition: 'all .1s',
  fontFamily: 'Montserrat, sans-serif',
  borderRadius: '8px',
  height: '40px',
  minWidth: 'max-content',
  whiteSpace: 'nowrap',
  ":hover": {
    filter: "contrast(.85)",
    boxShadow: '0 1px 5px rgba(0, 0, 0, .2)',
  }
})

CustomButton.defaultProps = {
  variant: 'contained',
}

export default CustomButton