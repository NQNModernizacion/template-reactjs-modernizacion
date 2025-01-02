import { DataGrid, esES } from "@mui/x-data-grid";
import { useState } from "react";

const Table = ({
  data,
  rowClick,
  loading,
  render,
  getRowClassName,
  search,
  height = 400,
  msAutoSerach = true,
  onSelectionModelChange,
}) => {
  const { rows, columns, filter } = data;
  const [state, setState] = useState("");

  const changeValue = ({ target: { value } }) => setState(value);
  return (
    <>
      {search && (
        <div className="card mb-1 d-flex flex-row">
          {render && render()}
          <div className={`d-flex flex-row p-2 ${msAutoSerach && "ms-auto"}`}>
            <input
              id="search"
              type="search"
              className="form-control"
              value={state}
              placeholder="Buscar..."
              onChange={changeValue}
            />
          </div>
        </div>
      )}

      <div style={{ height, width: "100%" }} className="d-flex">
        <DataGrid
          onRowClick={rowClick ? rowClick : () => {}}
          rows={rows.filter((el) => filter(el, state))}
          columns={columns}
          pageSize={20}
          loading={loading}
          disableSelectionOnClick
          /* rowsPerPageOptions={[10]} */
          density="compact"
          disableColumnMenu
          hideFooterSelectedRowCount
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            // disable cell selection style
            ".MuiDataGrid-cell:focus": {
              outline: "none",
            },
            // pointer cursor on ALL rows
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
          }}
          keepNonExistentRowsSelected
          checkboxSelection={onSelectionModelChange ? true : false}
          onSelectionModelChange={onSelectionModelChange ? onSelectionModelChange : () => {}}
          getRowClassName={getRowClassName ? getRowClassName : () => {}}
        />
      </div>
    </>
  );
};

export default Table;
