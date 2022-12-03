import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
	session: {
		strategy: "jwt",
	},

	providers: [
		CredentialsProvider({
			type: "credentials",
			credentials: {},
			async authorize(credentials, req) {
				const { username, password } = credentials;

				const user = { id: "1", name: "Kojo Patrick", username: "kojopatrick", password: "password" };

				if (user.username === username && user.password === password) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				}
				throw new Error("invalid credentials");
			},
		}),
	],
	pages: {
		signIn: "/auth/login",
	},
};

export default NextAuth(authOptions);
