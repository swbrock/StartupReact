import * as React from "react";
import { NextSeo } from "next-seo";

// material-ui
import { Box, BoxProps } from "@mui/material";

interface TablePageProps extends BoxProps {
  title: string;
  children: React.ReactNode;
}

// ============================|| COMPONENT - TABLE PAGE ||============================== //

/**
 * Basic layout for a page with a table on it. It contains a Box that centers and
 * aligns the content and a NextSeo component that sets the page title.
 *
 * @example
 * const pageTitle = "Users Table";
 *
 * return (
 *  <TablePage title={pageTitle}>
 *    <BYUToolbar title={pageTitle}>
 *      <Button variant="contained" color="primary">Add User</Button>
 *    </BYUToolbar>
 *    <UserTable />
 *  </TablePage>
 * )
 */
function TablePage({ title, children, ...props }: TablePageProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={0}
      padding={0}
      pt="2rem"
      alignItems="center"
      {...props}
    >
      <NextSeo title={title} />
      <Box width="80%" sx={{ pb: "4rem" }}>
        {children}
      </Box>
    </Box>
  );
}

export default TablePage;
