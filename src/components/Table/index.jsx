import { DataGrid, esES } from '@mui/x-data-grid';
import { useState } from 'react';

const Table = ({ data, rowClick }) => {
    const { rows, columns, filter } = data;
    const [state, setState] = useState('');

    const changeValue = ({ target: { value } }) => setState(value);
    return (
        <>
            <div className="card mb-1 d-flex flex-row">
                <div className="d-flex flex-row p-2">
                    <label htmlFor="search" className="my-auto me-3" role="button">
                        Buscar
                    </label>
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
            <div style={{ height: 400 }}>
                <DataGrid
                    onRowClick={rowClick}
                    rows={rows.filter((el) => filter(el, state))}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    density="compact"
                    disableColumnMenu
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                />
            </div>
        </>
    );
};

export default Table;
