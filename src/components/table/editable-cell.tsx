import { Form, Input, InputRef } from "antd";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { EditableContext } from "./editable-context";

type TEditableCell = {
	title: string;
	editable: boolean;
	children: React.ReactNode;
	dataIndex: number;
	record: Record<string, unknown>;
	handleSave: (record: Record<string, unknown>) => void;
};

const EditableCell: FC<TEditableCell> = (props) => {
	const {
		title,
		editable,
		children,
		dataIndex,
		record,
		handleSave,
		...restProps
	} = props;

	const [editing, setEditing] = useState(false);
	const inputRef = useRef<InputRef>(null);
	const form = useContext(EditableContext);

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

	const save = async () => {
		try {
			const values = await form?.validateFields();
			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log("Save failed:", errInfo);
		}
	};

	let childNode = children;

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
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
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
