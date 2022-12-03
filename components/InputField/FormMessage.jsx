import React from "react";

const FormErrorMessage = (props) => {
	return (
		<>
			<p
				className={`pt-2 text-sm ${
					props.status == "success" ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
				}`}
			>
				<span className="font-medium">{props.status == "success" ? <>Alright!</> : <>Oops!</>}</span> {props.message}
			</p>
		</>
	);
};

export default FormErrorMessage;
