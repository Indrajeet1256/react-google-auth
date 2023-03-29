import { FC } from "react";
import { Navigate } from "react-router-dom";

import { useFirebaseContext } from "../context/firebaseContext";

const withAuth = (Component: FC<any>) => {
	return (props: any) => {
		const { user } = useFirebaseContext()!;

		return !user ? <Component {...props} /> : <Navigate to="/protected" />;
	};
};

export default withAuth;
