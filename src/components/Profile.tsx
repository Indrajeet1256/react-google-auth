import { AiOutlineUser } from "react-icons/ai";
import { useFirebaseContext } from "../context/firebaseContext";

const Profile = () => {
	const { user } = useFirebaseContext()!;

	return (
		<>
			{user && (
				<div className="bg-gray-100 max-w-md mx-auto rounded-md shadow-md w-100 flex items-start justify-center flex-col gap-2 overflow-hidden">
					<header className="text-center bg-gray-800 self-stretch py-3 px-2">
						<h2 className="inline-flex items-center gap-2">
							<AiOutlineUser size={20} color="white" />
							<span className="text-lg text-white font-inter-bold uppercase tracking-wide">
								Profile
							</span>
						</h2>
					</header>
					<ul className="px-3 space-y-2 pb-2">
						<li className="text-sm sm:text-base">
							<span>Username:</span> <span>{user.displayName}</span>
						</li>
						<li className="text-sm sm:text-base">
							<span>Email:</span> <span>{user.email}</span>
						</li>
					</ul>
				</div>
			)}
		</>
	);
};

export default Profile;
