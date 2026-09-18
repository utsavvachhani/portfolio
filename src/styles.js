import { makeStyles } from "@mui/styles";

// Shared button styles
const sharedButton = (theme) => ({
  backgroundColor: `${theme.palette.custom.button.background} !important`,
  color: `${theme.palette.custom.button.text} !important`,
  boxShadow: `0px 5px ${theme.palette.custom.button.hoverShadow} !important`,
  "&:hover": {
    color: `${theme.palette.custom.button.hoverTextSecondary} !important`,
    boxShadow: `5px 0px ${theme.palette.custom.button.hoverShadow} !important`,
    fontWeight: "bold !important",
  },
  "&.Mui-disabled": {
    backgroundColor: `${theme.palette.custom.button.disableBaground} !important`,
    color: `${theme.palette.custom.button.disabledText} !important`,
    border: `2px solid ${theme.palette.custom.button.disabledBorder} !important`,
    cursor: "not-allowed",
  },
});

export const useStyles = makeStyles((theme) => ({
  ButtonUI: {
    ...sharedButton(theme),
    width: "100%",
    gap: 15,
  },
  NavBarButtonUI: {
    width: "100%",
    gap: 15,
    "&:hover": {
      backgroundColor: `${theme.palette.custom.button.hover} !important`,
      color: `${theme.palette.custom.button.hoverText} !important`,
      fontWeight: "bold !important",
    },
  },
  avatar: {
    backgroundColor: `${theme.palette.custom.colors.avatarBackground} !important`,
    color: `${theme.palette.custom.colors.avatar} !important`,
  },
  manuNavbar: {
    backgroundColor: "transperent !important",
  },

  input: {
    boxSizing: "border-box",
    paddingRight: 0,
    margin: "5px !important",
    color: theme.palette.primary.main,
  },

  siginbutton: {
    ...sharedButton(theme),
    marginBottom: "10px !important",
  },
}));
