import * as React from "react";

// material-ui
import { Toolbar, ToolbarProps, Typography } from "@mui/material";

/**
 * Props for the BYUToolbar component.
 */
interface BYUToolbarProps extends ToolbarProps {
  /** Title of the toolbar. */
  title: string;
  /** Subtitle of the toolbar. */
  subtitle?: string;
  /** Whatever is on the right side of the toolbar (Usually a button) */
  children?: React.ReactNode;
}

// ============================|| COMPONENT - BYU TOOLBAR ||============================== //

/**
 * Navy bar at the top of the table.
 *
 * @example
 * const pageTitle = "Users Table";
 * const pageSubtitle = "(Visible by Administrators only)";
 *
 * return (
 *  <BYUToolbar title={pageTitle} subtitle={pageSubtitle}>
 *     <Button variant="contained" color="primary">Add User</Button>
 *  </BYUToolbar>
 * )
 */
const BYUToolbar = ({ title, subtitle, children }: BYUToolbarProps) => {
  const navyColor = "#002E5D";

  return (
    <Toolbar
      sx={{
        background: navyColor,
        justifyContent: "space-between",
        borderTopRightRadius: "4px",
        borderTopLeftRadius: "4px",
      }}
    >
      <Typography
        color="white"
        variant="h5"
        noWrap
        component="div"
        sx={{ width: "50%" }}
      >
        {title}
        {subtitle && (
          <Typography color="white" variant="body2">
            {subtitle}
          </Typography>
        )}
      </Typography>
      {children}
    </Toolbar>
  );
};

export default BYUToolbar;
