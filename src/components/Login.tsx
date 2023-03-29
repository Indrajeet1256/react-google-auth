import { useState } from "react";
import InputControl from "./InputControl";
import { useFirebaseContext } from "../context/firebaseContext";
import { useNavigate } from "react-router-dom";
import withAuth from "../HOC/withAuth";

type User = {
	email?: "";
	password?: "";
} | null;

const Login = () => {
	const navigate = useNavigate();
	const { handleLogin } = useFirebaseContext()!;
	const [user, setUser] = useState<User>({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { email, password } = user!;
		if (email && password) {
			try {
				await handleLogin({ email, password });
				setUser((prev) => ({ ...prev, email: "", password: "" }));
				navigate("/protected", { replace: true });
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<>
			<h1 className="text-3xl mb-4 uppercase font-bold text-gray-500  border-gray-400 pb-2 border-b-2">
				Login
			</h1>
			<div className="bg-gray-100 shadow-md px-5 py-7 max-w-sm sm:max-w-md w-full">
				<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						<label
							htmlFor="email"
							className="text-sm font-inter-medium text-gray-600">
							Email
						</label>
						<InputControl
							type="email"
							placeholder="Enter Email"
							required
							name="email"
							value={user!["email"]}
							className="text-sm border-gray-300 px-2 py-3 border rounded-md outline-none focus:border-blue-300"
							onChange={handleChange}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label
							htmlFor="password"
							className="text-sm font-inter-medium text-gray-600">
							Password
						</label>
						<InputControl
							type="password"
							placeholder="Enter Password"
							required
							name="password"
							value={user!["password"]}
							className="text-sm border-gray-300 px-2 py-3 border rounded-md outline-none focus:border-blue-300"
							onChange={handleChange}
						/>
					</div>
					<button
						type="submit"
						className="text-sm w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-2 font-inter-semibold uppercase tracking-tight rounded-md cursor-pointer">
						Log In
					</button>
				</form>
			</div>
		</>
	);
};

export default withAuth(Login);
