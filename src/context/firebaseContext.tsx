import { useState, useEffect } from "react";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	User,
	signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { createContext, ReactNode, useContext } from "react";

interface UserData {
	name?: string;
	email: string;
	password: string;
}

interface ContextType {
	user: null | User;
	handleLogin: (user: UserData) => void;
	handleRegister: (user: UserData) => void;
	handleLogOut: () => void;
}

const FirebaseContext = createContext<ContextType | undefined>(undefined);

export const useFirebaseContext = () => {
	return useContext(FirebaseContext);
};

export function FirebaseProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const storage = localStorage.getItem("user");
		if (storage) {
			const storedUser = JSON.parse(storage) as User;
			setUser(storedUser);
		}
	}, []);

	const handleLogin = ({ email, password }: UserData): Promise<any> => {
		return signInWithEmailAndPassword(auth, email, password)
			.then((user) => {
				localStorage.setItem("user", JSON.stringify(user.user));
				setUser(user?.user);
			})
			.catch((err) => {
				return Promise.reject(err);
			});
	};

	const handleRegister = ({
		email,
		password,
		name,
	}: UserData): Promise<any> => {
		return createUserWithEmailAndPassword(auth, email, password)
			.then((user) => {
				updateProfile(user.user, { displayName: name });
			})
			.catch((err) => {
				return Promise.reject(err);
			});
	};

	const handleLogOut = async () => {
		await signOut(auth);
		setUser(null);
		localStorage.removeItem("user");
	};

	const data = { user, handleLogin, handleRegister, handleLogOut };
	return (
		<FirebaseContext.Provider value={data}>{children}</FirebaseContext.Provider>
	);
}
