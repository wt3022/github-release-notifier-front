import { Button, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

function NavigateButton({
  to,
  className,
  color = "primary",
  sx,
  children,
  state,
}: {
  to: string;
  className?: string;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  sx?: SxProps<Theme>;
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: any;
}) {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      color={color}
      className={className}
      sx={sx}
      onClick={() => navigate(to, { state: state })}
    >
      {children}
    </Button>
  );
}

function SubmitButton({
  variant = "contained",
  className,
  sx,
  children,
}: {
  variant?: "contained" | "outlined" | "text";
  className?: string;
  sx?: SxProps<Theme>;
  children: ReactNode;
}) {
  return (
    <Button type="submit" variant={variant} className={className} sx={sx}>
      {children}
    </Button>
  );
}

export { NavigateButton, SubmitButton };
