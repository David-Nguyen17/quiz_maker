import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export interface IProps extends ButtonProps {
  isError?: boolean;
  isSelected?: boolean;
  title: string;
  onClick: () => void;
}

function AppButton(props: IProps) {
  const {
    title, isError, isSelected, onClick, sx = {}, ...rest
  } = props;
  const stylesSelected = isSelected
    ? {
      backgroundColor: isError ? "red" : "green",
      color: "white",
    }
    : {};
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      {...rest}
      sx={{ ...stylesSelected, ...sx }}
    >
      <Typography>{title}</Typography>
    </Button>
  );
}

export default AppButton;
