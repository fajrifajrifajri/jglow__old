import React from "react";
import { useTable, useBlockLayout } from 'react-table';

// Styling
import '../../../Assets/css/index.css';

export const Table = (props) => {
	// const [ hapus, setHapus ] = useState(0);
	
	// Access props.columns
	// const cols = useMemo(() => props.columns, [])
	const cols = props.columns;
	
	// Access props.data
	const data = props.data;
	
	const tableInstance = useTable({ columns: cols, data }, useBlockLayout);
	
	const {
		// getHeaderProps,
		// getCellProps,
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance
	
	return (
		<table {...getTableProps()}>
			<thead>
			{headerGroups.map((headerGroup) => (
				<tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map((column) => (
						<th {...column.getHeaderProps ({
							className: column.custom  ? 'border border-collapse border-gray-100 p-2' : 'border border-collapse border-gray-100 p-4',
						})}>{column.render('Header')}</th>
					))}
				</tr>
			))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row)
					return (
						<tr {...row.getRowProps({
							className: row.original.sudah_order === true  ? 'bg-green-200' : '',
						})}>
							{row.cells.map( (cell) => {
								return <td {...cell.getCellProps({
									className: cell.column.custom  ? 'border border-collapse border-gray-100 p-2 text-center' : 'border border-collapse border-gray-100 p-4',
								})}>{cell.render('Cell')}</td>
							})}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
	
}