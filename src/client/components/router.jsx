import { Routes, Route, BrowserRouter } from "react-router-dom";
import NextTopLoader from "nextjs-toploader";
import HomePage from "../pages";
import SignIn from "../pages/sign-in";
import ScrollToTop from "./scroll-to-top";

const Router = () => (
	<BrowserRouter>
		<NextTopLoader color="orangered" />
		<ScrollToTop />
		<Routes>
			<Route index element={<HomePage />} />
			<Route path="/sign-in" element={<SignIn />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
