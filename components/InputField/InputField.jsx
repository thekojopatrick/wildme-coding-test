import { Field, useField } from "formik";
import React from "react";

const InputField = (props) => {
	const [field, meta] = useField(props);
	return (
		<>
			<div>
				<label htmlFor={props.id} className="sr-only">
					{props.label}
				</label>
				<Field
					{...props}
					{...field}
					className={`relative block w-full appearance-none rounded-none ${props.bordertype} border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
				/>
			</div>
		</>
	);
};

export default InputField;
