import { useEffect, useState } from "react"

import {
    DataGrid,
    GridCallbackDetails as GCD,
    GridColDef,
    GridEventListener,
    GridRowClassNameParams as GCNP,
    GridRowSelectionModel as GRSM,
    esES,
    GridRowClassNameParams,
    GridRowHeightParams,
    GridRowHeightReturnValue,
} from "@mui/x-data-grid"

interface TableProps {
    data: {
        rows: any[]
        columns: GridColDef[]
    }
    onRowClick?: GridEventListener<"rowClick"> | undefined | null
    onCellClick?: GridEventListener<"cellClick"> | undefined
    loading?: boolean
    render?: () => JSX.Element
    getRowClassName?: ((params: GCNP<any>) => string) | undefined
    search?: boolean
    height?: string | number
    msAutoSerach?: boolean
    onRowSelectionModelChange?:
        | ((rowSelectionModel: GRSM, details: GCD<any>) => void)
        | undefined
    onSelectionModelChange?: (params: any) => void
    disabledSearch?: boolean
    sx?: any
    getRowHeight?: (params: GridRowHeightParams) => GridRowHeightReturnValue
    trigger?: boolean
}

const Table: React.FC<TableProps> = ({
    data,
    onRowClick,
    onCellClick,
    loading,
    render,
    getRowClassName,
    search,
    height = 400,
    disabledSearch = false,
    onSelectionModelChange,
    sx = {},
    getRowHeight,
    trigger = true,
}) => {
    const { rows, columns } = data
    const [state, setState] = useState("")

    const arrayValue = state.toLowerCase().trim().split(" ")

    const newFilter = (arrayValue: string[], data: any[]) => {
        arrayValue = arrayValue.filter((elemento) => elemento !== "")

        while (arrayValue.length) {
            data = data.filter((el) => fiterByProperty(el, arrayValue))
            arrayValue.splice(0, 1)
        }

        return data
    }

    useEffect(() => {
        setState("")
    }, [trigger])

    const fiterByProperty = (el: any, a: any) => {
        for (const key in el) {
            if (el.hasOwnProperty!(key) && el[key]) {
                const attribute = el[key].toString().toLowerCase()
                if (attribute.includes(a[0])) return true
            }
        }
        return false
    }

    return (
        <>
            {search && (
                <div className='card mb-1 d-flex flex-row'>
                    {render && render()}
                    <div className='d-flex flex-row p-2 ms-auto'>
                        <input
                            id='search'
                            type='search'
                            className='form-control'
                            disabled={disabledSearch}
                            value={state}
                            placeholder='Buscar...'
                            onChange={(e: any) => setState(e.target.value)}
                        />
                    </div>
                </div>
            )}

            <div
                style={{ height, width: "100%", padding: 0 }}
                className='d-flex'
            >
                <DataGrid
                    onRowClick={onRowClick ? onRowClick : () => {}}
                    rows={
                        disabledSearch
                            ? rows
                            : newFilter(arrayValue, rows ? rows : [])
                    }
                    /* rows={rows.filter((el) => filter(el, state))} */
                    columns={columns}
                    loading={loading}
                    density='compact'
                    disableColumnMenu
                    hideFooterSelectedRowCount
                    localeText={
                        esES.components.MuiDataGrid.defaultProps.localeText
                    }
                    onCellClick={onCellClick ? onCellClick : () => {}}
                    sx={{
                        ".MuiDataGrid-cell": {
                            padding: "0 5px",
                        },
                        // disable cell selection style
                        ".MuiDataGrid-cell:focus": {
                            outline: "none",
                        },
                        "& .MuiDataGrid-row.oddRow": {
                            background: "#F2F2F2",
                        },
                        "& .MuiDataGrid-row:hover": {
                            cursor: "pointer",
                            background: `#a29f9f !important`,
                            color: "black !important",
                        },
                        /* "& .MuiDataGrid-cell": {
                            borderRight: "1px solid #ccc",
                        },
                        "& .MuiDataGrid-cell:last-child": {
                            borderRight: "none",
                        }, */
                        ...sx,
                    }}
                    checkboxSelection={onSelectionModelChange ? true : false}
                    onRowSelectionModelChange={
                        onSelectionModelChange
                            ? onSelectionModelChange
                            : () => {}
                    }
                    getRowHeight={getRowHeight}
                    getRowClassName={
                        getRowClassName
                            ? getRowClassName
                            : (params: GridRowClassNameParams<any>) =>
                                  params.indexRelativeToCurrentPage % 2
                                      ? ""
                                      : "oddRow"
                    }
                />
            </div>
        </>
    )
}

export default Table
