import { Alert, IconButton, Snackbar, ThemeProvider, createTheme } from "@mui/material";
import React, { SyntheticEvent } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { resetAlert } from "@/store/alertSlice";
import palette from "@assets/styles/palette.module.scss"

function PopupAlert({
  text = "",
  severity = "success",
  autoHideDuration = 0,
  variant = "standard"
}: {
  text?: string,
  severity?: "success" | "info" | "warning" | "error",
  autoHideDuration?: number,
  variant?: "standard" | "filled" | "outlined"
}) {
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch()

  function handleClose(event: React.MouseEvent<HTMLButtonElement> | Event | SyntheticEvent<any, Event>) {
    dispatch(resetAlert())
    setOpen(false);
  }

  const theme = createTheme({
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === "error" &&
            {
              backgroundColor: `${palette.lightColor}`,
              borderColor: palette.errorColor,
              color: palette.errorColor,
            }),
            ...(ownerState.severity === "warning" &&
            {
              backgroundColor: `${palette.lightColor}`,
              borderColor: palette.warningColor,
              color: palette.warningColor,
            }),
            ...(ownerState.severity === "info" &&
            {
              backgroundColor: `${palette.lightColor}`,
              borderColor: palette.infoColor,
              color: palette.infoColor,
            }),
            ...(ownerState.severity === "success" &&
            {
              backgroundColor: `${palette.lightColor}`,
              borderColor: palette.successColor,
              color: palette.successColor,
            }),
            borderWidth: 1,
            borderStyle: 'solid',
            backdropFilter: 'blur(50px)',
            borderRadius: 5,
          }),
        },
      },
    }
  })

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open}
          autoHideDuration={autoHideDuration}
          onClose={handleClose}
          action={[
            <IconButton style={{ color: palette.darkColor }}>
              <CloseIcon style={{ color: palette.darkColor }}/>
            </IconButton>
          ]}
        >
          <Alert
            sx={{ width: '100%', minWidth: 280 }}
            severity={severity}
            onClose={handleClose}
            variant={variant}
          >
            {text}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
}

export default PopupAlert