import React, { useMemo, useState } from "react";
import { useTable } from 'react-table';
import axios from 'axios';

// Styling
import '../../../Assets/css/index.css';

export const Table = (props) => {
	const [ hapus, setHapus ] = useState(0);
	
	// Access props.columns
	const cols = useMemo(() => props.columns, [])
	
	// Access props.data
	const data = props.data;
	
	const tableInstance = useTable({ columns: cols, data })
	
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance
	
	return (
		<table {...getTableProps()} className="w-full border border-black border-collapse">
			<thead>
			{headerGroups.map((headerGroup) => (
				<tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map((column) => (
						<th {...column.getHeaderProps ()} className="border border-black p-4">{column.render('Header')}</th>
					))}
				</tr>
			))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row)
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map( (cell) => {
								return <td {...cell.getCellProps()} className="border border-black p-4">{cell.render('Cell')}</td>
							})}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
	
}