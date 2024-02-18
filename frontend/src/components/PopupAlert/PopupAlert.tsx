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
              backgroundColor: `${palette.errorColor}60`,
              color: palette.darkColor,
            }),
            ...(ownerState.severity === "warning" &&
            {
              backgroundColor: `${palette.warningColor}60`,
              color: palette.darkColor,
            }),
            ...(ownerState.severity === "info" &&
            {
              backgroundColor: `${palette.infoColor}60`,
              color: palette.darkColor,
            }),
            ...(ownerState.severity === "success" &&
            {
              backgroundColor: `${palette.successColor}60`,
              color: palette.darkColor,
            }),
            backdropFilter: 'blur(10px)'
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
            <IconButton>
              <CloseIcon />
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