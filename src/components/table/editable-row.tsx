import { Form } from "antd";
import { FC } from "react";
import { EditableContext } from "./editable-context";

const EditableRow: FC = ({ ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};

export default EditableRow;
