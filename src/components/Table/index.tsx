import { DataGrid, esES } from '@mui/x-data-grid';
import { useState } from 'react';

interface ITable {
  data: {
    rows: [];
    columns: [];
    filter: any;
  };
  rowClick: () => void;
}

const Table: React.FC<ITable> = ({ data, rowClick }) => {
  const { rows, columns, filter } = data;
  const [state, setState] = useState('');

  const changeValue = ({ target: { value } }) => setState(value);

  return (
    <>
      <div className='card mb-1 d-flex flex-row'>
        <div className='d-flex flex-row p-2'>
          <label className='my-auto me-3' htmlFor='search' role='button'>
            Buscar
          </label>
          <input
            className='form-control'
            id='search'
            placeholder='Buscar...'
            type='search'
            value={state}
            onChange={changeValue}
          />
        </div>
      </div>
      <div style={{ height: 600 }}>
        <DataGrid
          disableColumnMenu
          columns={columns}
          density='compact'
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={10}
          rows={rows.filter((el) => filter(el, state))}
          rowsPerPageOptions={[10]}
          onRowClick={rowClick}
        />
      </div>
    </>
  );
};

export default Table;
