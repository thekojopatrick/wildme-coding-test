import React, { useEffect } from "react";
import Router from "next/router";
import Button from "components/Button/Button";
import FormErrorMessage from "components/InputField/FormMessage";
import InputField from "components/InputField/InputField";
import { Formik, Form } from "formik";
import { signIn } from "next-auth/react";
import { formSchema } from "utils/Schema";
import { useSession } from "next-auth/react";

const LoginScreen = () => {
	const { status } = useSession();

	useEffect(() => {
		if (status === "authenticated") Router.replace("/protected");
	}, [status]);

	console.log(status);

	return (
		<>
			<Formik
				initialValues={{
					username: "",
					password: "",
				}}
				validationSchema={formSchema}
				onSubmit={(values, actions) => {
					const vals = { ...values };
					actions.resetForm();
					signIn("credentials", { ...values, redirect: false })
						.catch((err) => console.log(err))
						.then((res) => {
							console.log(res);
						});

					alert(JSON.stringify(vals));
				}}
			>
				{({ errors, touched }) => (
					<div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
						<div className="w-full max-w-md space-y-8">
							<div>
								<img className="mx-auto h-24 w-auto" src="/wildme.png" alt="Your Company" />
								<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
									Sign in to your account
								</h2>
							</div>
							<Form className="mt-8 space-y-6">
								<div className="-space-y-px">
									<InputField
										id="username"
										name="username"
										type="text"
										placeholder="Enter username"
										autoComplete="off"
										bordertype="rounded-t-md"
									/>

									<InputField
										id="password"
										name="password"
										type="password"
										placeholder="Password"
										autoComplete="off"
										bordertype="rounded-b-md"
									/>

									{(errors.username && touched.username) || (errors.password && touched.password) ? (
										<div>
											<FormErrorMessage message={errors.username || errors.password} />
										</div>
									) : null}
								</div>
								<Button type="submit" />
							</Form>
						</div>
						<pre className="mt-8">"username":"kojopatrick", "password":"password",</pre>
					</div>
				)}
			</Formik>
		</>
	);
};

export default LoginScreen;
