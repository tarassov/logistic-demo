import { FormInstance } from "antd";
import React from "react";

export const EditableContext = React.createContext<FormInstance | null>(null);
