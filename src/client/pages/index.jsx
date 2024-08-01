import { Link } from "react-router-dom";
import banner from "../assets/images/foods-bg.webp";
import { lazy, Suspense } from "react";
import SignUpFormOptimisticUi from "../components/sign-up-form-optimistic-ui";

const SignUpForm = lazy(() => import("../components/sign-up-form"));

const HomePage = () => {
	return (
		<div className="w-full min-h-screen flex">
			<div className="space-y-6 flex-1 max-w-[480px] max-[720px]:max-w-full bg-gradient-to-b from-orange-700 via-orange-500 to-orange-600 text-white py-12 px-4">
				<div className="space-y-2">
					<img
						src="/assets/images/logo-white.svg"
						alt="Foodie logo"
						className="block m-auto"
					/>
					<h1 className="text-center text-4xl md:text-5xl font-bold">
						Hungry? <br />
						Order Now!
					</h1>
					<p className="text-center text-lg max-w-96 mx-auto">
						Discover the best foods and restaurants around you.
						Place your orders and have them delivered to your
						doorstep.
					</p>
				</div>
				<Suspense fallback={<SignUpFormOptimisticUi />}>
					<SignUpForm />
				</Suspense>
				<div className="text-center text-sm space-y-4">
					<p>
						Have an account already?{" "}
						<Link className="underline" to={"/sign-in"}>
							Sign in here
						</Link>
					</p>
					<div className="space-x-5 space-y-3 text-xs">
						<Link to={"/privacy"}>Privacy Policies</Link>
						<span>|</span>
						<Link to={"/terms"}>Terms of Use</Link>
					</div>
					<p className="text-xs">
						Foodie&copy; {new Date().getFullYear()}
					</p>
				</div>
			</div>
			<div className="flex-1 sticky top-0 h-screen max-[720px]:hidden">
				<img
					src={banner}
					width="800"
					height="600"
					alt="Delicious food"
					className="w-full object-cover block h-full"
				/>
			</div>
		</div>
	);
};

export default HomePage;
