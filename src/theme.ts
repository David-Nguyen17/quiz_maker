import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  colorSchemes: {},
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          border: `1px solid green`,
          color: "green",
          borderRadius: 6,
          ":hover": {
            backgroundColor: "green",
            color: "white",
          },
        },
      },
    },
  },
});

export default theme;
