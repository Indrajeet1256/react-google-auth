import { NavLink, useLocation } from "react-router-dom";
import { useFirebaseContext } from "../context/firebaseContext";
import Timer from "./Timer";
import { delay } from "../utils/delay";
import {
	AiFillGoogleCircle,
	AiFillPlusCircle,
	AiOutlineLogin,
	AiOutlineLogout,
} from "react-icons/ai";

const Header = () => {
	const location = useLocation();
	const time = new Date();
	time.setSeconds(time.getSeconds() + 60);
	const { user, handleLogOut } = useFirebaseContext()!;

	const handleSignOut = async () => {
		alert("Session Expired You Need To Login Again...");
		await delay();
		handleLogOut();
	};

	return (
		<header className="bg-gray-900 w-full">
			<div className="sm:px-3 px-1 py-7 flex flex-row items-center justify-between">
				<h2 className="font-inter-semibold text-lg tracking-tight text-white whitespace-nowrap flex gap-1 items-center">
					<AiFillGoogleCircle size={23} className="sm:block hidden" />
					Google Auth
				</h2>
				{!user && (
					<div className="space-x-2">
						<NavLink
							to="/login"
							role="button"
							className="sm:px-3 py-2 px-2 bg-blue-500 rounded-md cursor-pointe hover:bg-blue-600 inline-flex items-center gap-2">
							<AiOutlineLogin
								size={20}
								color="white"
								className="sm:block hidden"
							/>
							<span className="text-white tracking-tight uppercase text-sm font-inter-semibold">
								Login
							</span>
						</NavLink>
						<NavLink
							to="/register"
							role="button"
							className="sm:px-3 px-2 py-2 bg-green-500 rounded-md cursor-pointer hover:bg-green-600 inline-flex items-center gap-2">
							<AiFillPlusCircle
								size={20}
								color="white"
								className="sm:block hidden"
							/>
							<span className="text-white tracking-tight uppercase text-sm font-inter-semibold">
								Register
							</span>
						</NavLink>
					</div>
				)}
				{user && (
					<div className="flex flex-row items-center gap-2">
						{location?.pathname === "/protected" && (
							<Timer expiry={time} handleSignOut={handleSignOut} />
						)}
						<button
							type="button"
							className="px-3 py-2 bg-red-500 rounded-md cursor-pointer hover:bg-red-600 inline-flex items-center gap-2">
							<span
								className="text-white font-inter-semibold tracking-tight uppercase text-sm"
								onClick={handleLogOut}>
								Logout
							</span>
							<AiOutlineLogout
								size={20}
								color="white"
								className="sm:block hidden"
							/>
						</button>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
