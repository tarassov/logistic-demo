import { Button, Table } from "antd";
import { FC } from "react";
import EditableRow from "./editable-row";
import EditableCell from "./editable-cell";

type TEditableTableProps = {
	dataSource: Array<Record<string, unknown>>;
	defaultColumns: Array<{
		title: string;
		dataIndex: string;
		width?: string;
		editable?: boolean;
	}>;
};

const EditableTable: FC<TEditableTableProps> = ({
	dataSource,
	defaultColumns,
}) => {
	const columns = defaultColumns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record: Record<string, unknown>) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave,
			}),
		};
	});

	const handleSave = (row: Record<string, unknown>) => {
		console.debug(row);
	};

	const handleAdd = () => {
		console.debug("add new row");
	};

	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell,
		},
	};

	return (
		<div>
			<Button
				onClick={handleAdd}
				type="primary"
				style={{
					marginBottom: 16,
				}}
			>
				Add a row
			</Button>
			<Table
				components={components}
				rowClassName={() => "editable-row"}
				bordered
				dataSource={dataSource}
				columns={columns}
			/>
		</div>
	);
};

export default EditableTable;
