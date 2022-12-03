import React from "react";

const Button = (props) => {
	return (
		<button
			{...props}
			className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-cyan-500 to-teal-500 py-3 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
		>
			Sign in
		</button>
	);
};

export default Button;
