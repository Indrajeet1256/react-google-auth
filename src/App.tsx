import { Header } from "./components";
import { Home, Login, Register, Protected } from "./pages";
import { Routes, Route } from "react-router-dom";

const App = () => {
	return (
		<main className="flex flex-col h-screen">
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/protected" element={<Protected />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</main>
	);
};

export default App;
