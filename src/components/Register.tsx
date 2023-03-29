import { useState } from "react";
import InputControl from "./InputControl";
import { useFirebaseContext } from "../context/firebaseContext";
import { useNavigate } from "react-router-dom";
import withAuth from "../HOC/withAuth";
type User = {
	email?: "";
	password?: "";
	username?: "";
} | null;

const Register = () => {
	const { handleRegister } = useFirebaseContext()!;
	const navigate = useNavigate();
	const [user, setUser] = useState<User>({
		email: "",
		password: "",
		username: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { email, password, username } = user!;
		if (email && password && username) {
			try {
				await handleRegister({ email, password, name: username });
				setUser((prev) => ({ ...prev, email: "", password: "", username: "" }));
				navigate("/login", { replace: true });
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<>
			<h1 className="text-3xl mb-4 uppercase font-bold text-gray-500  border-gray-600 pb-2 border-b-2">
				Register
			</h1>
			<div className="bg-gray-100 shadow-md px-5 py-7 max-w-sm sm:max-w-md w-full">
				<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						<label
							htmlFor="username"
							className="text-sm font-inter-medium text-gray-600">
							Username
						</label>
						<InputControl
							type="text"
							name="username"
							placeholder="Enter Username"
							required
							value={user!["username"]}
							className="text-sm border-gray-300 px-2 py-3 border rounded-md outline-none focus:border-blue-300"
							onChange={handleChange}
						/>
					</div>
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
							value={user!["email"]}
							name="email"
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
							value={user!["password"]}
							name="password"
							className="text-sm border-gray-300 px-2 py-3 border rounded-md outline-none focus:border-blue-300"
							onChange={handleChange}
						/>
					</div>
					<button
						type="submit"
						className="w-full text-sm bg-gray-800 hover:bg-gray-900 text-white py-3 px-2 font-inter-semibold uppercase tracking-tight rounded-md cursor-pointer">
						Register
					</button>
				</form>
			</div>
		</>
	);
};

export default withAuth(Register);
