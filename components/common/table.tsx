import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";

import { Box } from "@mui/material";
import styles from "../../styles/Home.module.css";

interface TableDataProps {
  columns: GridColDef[];
  data: Array<any>;
}

/**
 * This is a basic users table using MUI data-grid
 * @returns the user table component
 */
const CRUDTable = ({ columns, data }: TableDataProps) => {
  return (
    <main className={styles.main}>
      <Box sx={{ height: "75vh", width: "75%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </main>
  );
};

export default CRUDTable;
