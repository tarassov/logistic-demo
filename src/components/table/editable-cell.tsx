import { Form, RefSelectProps, Select } from "antd";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { EditableContext } from "./editable-context";
import { TSelectableValue } from "./editable-table";

type TEditableCell = {
	title: string;
	editable: boolean;
	source: Array<TSelectableValue>;
	children: React.ReactNode;
	dataIndex: number;
	record: Record<string, unknown> & { id: number };
	handleSave: (record: Record<string, unknown> & { id: number }) => void;
	render?: { (record: Record<string, unknown> & { id: number }): string };
};

const EditableCell: FC<TEditableCell> = (props) => {
	const {
		title,
		editable,
		source,
		children,
		dataIndex,
		record,
		handleSave,
		render,
		...restProps
	} = props;

	const [editing, setEditing] = useState(true);
	const inputRef = useRef<RefSelectProps>(null);
	const form = useContext(EditableContext);

	const { Option } = Select;

	useEffect(() => {
		if (editing && inputRef?.current) {
			inputRef.current.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form?.setFieldsValue({
			[dataIndex]: record[dataIndex],
		});
	};

	useEffect(() => {
		console.log(record);
		if (render) console.log(render(record));
		if (editable) {
			form?.setFieldsValue({
				[dataIndex]: render ? render(record) : "",
			});
		}
	}, [record, editable]);

	// const save = async () => {
	// 	try {
	// 		const values = await form?.validateFields();
	// 		toggleEdit();
	// 		handleSave({ ...record, ...values });
	// 	} catch (errInfo) {
	// 		console.log("Save failed:", errInfo);
	// 	}
	// };

	let childNode = children;

	const onChange = (value: any) => {
		record[dataIndex] = source.filter((s) => s.id == value)[0];
		handleSave(record);
	};

	const onSearch = (value: any) => {
		console.log("search:", value);
	};

	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0,
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} is required.`,
					},
				]}
			>
				<Select
					showSearch
					placeholder="Select a value..."
					optionFilterProp="children"
					onChange={onChange}
					onSearch={onSearch}
					ref={inputRef}
					filterOption={(input, option) => {
						return option?.children
							? option.children
									.toString()
									.toLowerCase()
									.includes(input.toLowerCase())
							: false;
					}}
				>
					{source &&
						source.map((item) => {
							return (
								<Option key={item.id} value={item.id}>
									{item.value}
								</Option>
							);
						})}
				</Select>
			</Form.Item>
		) : (
			<div
				className="editable-cell-value-wrap"
				style={{
					paddingRight: 24,
				}}
				onClick={toggleEdit}
			>
				{children}
			</div>
		);
	}

	return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
