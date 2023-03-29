import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	type: string;
	name?: string;
}
const InputControl = ({ type, name, ...rest }: InputProps) => {
	return <input type={type} name={name} {...rest} />;
};

export default InputControl;
