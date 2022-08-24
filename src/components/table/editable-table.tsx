import { Button, Table } from "antd";
import { FC } from "react";
import EditableRow from "./editable-row";
import EditableCell from "./editable-cell";
import styles from "./editable-table.module.css";

export type TSelectableValue = {
	id: number;
	value: string;
};

type TEditableTableProps = {
	dataSource: Array<Record<string, unknown> & { id: number }>;
	defaultColumns: Array<{
		title: string;
		dataIndex: string;
		width?: string;
		editable?: boolean;
		source?: Array<TSelectableValue>;
		render?: { (record: Record<string, unknown> & { id: number }): string };
	}>;
	onSave: { (record: Record<string, unknown> & { id: number }): void };
};

const EditableTable: FC<TEditableTableProps> = ({
	dataSource,
	defaultColumns,
	onSave,
}) => {
	const columns = defaultColumns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record: Record<string, unknown> & { id: number }) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				source: col.source,
				handleSave,
				render: col.render,
			}),
		};
	});

	const handleSave = (row: Record<string, unknown> & { id: number }) => {
		onSave(row);
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
		<div className={styles.container}>
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
				className={styles.editableTable}
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
