import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseContext } from "../context/firebaseContext";
import { Profile } from "../components";

const Protected = () => {
	const navigateRef = useRef(useNavigate());
	const { user } = useFirebaseContext()!;

	useEffect(() => {
		if (!user) {
			navigateRef.current("/login");
		}
	}, [user]);
	return (
		<section className="flex-1 py-3 px-2">
			<Profile />
		</section>
	);
};

export default Protected;
