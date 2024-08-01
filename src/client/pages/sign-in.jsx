import { Link } from "react-router-dom";
import banner from "../assets/images/foods-bg.webp";
import { lazy, Suspense } from "react";
import SignInFormOptimisticUi from "../components/sign-in-form-optimistic-ui";
import AccountActivationSuccessModal from "../components/account-activation-success-modal";

const SignInForm = lazy(() => import("../components/sign-in-form"));

const SignIn = () => {
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
						Welcome to Foodie
					</h1>
					<p className="text-center text-lg max-w-96 mx-auto">
						Your favorite meals, delivered fast and fresh!
					</p>
				</div>
				<Suspense fallback={<SignInFormOptimisticUi />}>
					<SignInForm />
				</Suspense>
				<div className="text-center text-sm space-y-4">
					<p>
						Don't have an account yet?{" "}
						<Link className="underline" to={"/"}>
							Create one here
						</Link>
					</p>
					<p>
						Forgot your password?{" "}
						<Link className="underline" to={"/"}>
							Recover it here
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
			<AccountActivationSuccessModal />
		</div>
	);
};

export default SignIn;
