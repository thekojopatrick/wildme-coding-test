import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { data: session } = useSession();

	const handleSignin = (e) => {
		e.preventDefault();
		signIn();
	};
	const handleSignout = (e) => {
		e.preventDefault();
		signOut();
	};

	console.log(session);
	return (
		<>
			<div className="px-6 pt-6 lg:px-8">
				<div>
					<nav className="flex h-9 items-center justify-between" aria-label="Global">
						<div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
							<a href="/" className="-m-1.5 p-1.5">
								<span className="sr-only">Wildme</span>
								<img className="h-8" src="/wildme.png" alt="Wildme" />
							</a>
						</div>
						<div className="flex lg:hidden">
							<button
								type="button"
								className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
								onClick={() => setMobileMenuOpen(true)}
							>
								<span className="sr-only">Open main menu</span>
								<Bars3Icon className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						<div className="hidden items-center gap-4 lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
							{session && <div className="text-lg font-medium">{session.user.name}</div>}
							<a
								href="#"
								onClick={session ? handleSignout : handleSignin}
								className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
							>
								{session ? <span>Logout</span> : <span>Log In</span>}
							</a>
						</div>
					</nav>
					<Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
						<Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
							<div className="flex h-9 items-center justify-between">
								<div className="flex">
									<a href="#" className="-m-1.5 p-1.5">
										<span className="sr-only">Wildme</span>
										<img className="h-8" src="/wildme.png" alt="" />
									</a>
								</div>
								<div className="flex">
									<button
										type="button"
										className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
										onClick={() => setMobileMenuOpen(false)}
									>
										<span className="sr-only">Close menu</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>
							</div>
							<div className="mt-6 flow-root">
								<div className="-my-6 divide-y divide-gray-500/10">
									<div className="py-6">
										<a
											href="/auth/login"
											className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
										>
											Log in
										</a>
									</div>
								</div>
							</div>
						</Dialog.Panel>
					</Dialog>
				</div>
			</div>
		</>
	);
};

export default Navbar;
