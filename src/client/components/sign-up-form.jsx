import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import handleSignUp from "../utils/sign-up";
import { CgSpinner } from "react-icons/cg";

const SignUpForm = () => {
	const { register, handleSubmit, formState } = useForm({ mode: "onBlur" });
	const { errors, isSubmitSuccessful, isSubmitted, isValid, isSubmitting } =
		formState;
	const errorClasses = "bg-red-100 border-red-500 placeholder:text-red-400";
	const fullNameRegexp =
		/^[a-zA-ZàáâäãåāèéêëēėęîïíīįìôöòóœøōõûüùúūÿýçćčñńßśšžźżÀÁÂÄÃÅĀÈÉÊËĒĖĘÎÏÍĪĮÌÔÖÒÓŒØŌÕÛÜÙÚŪŸÝÇĆČÑŃßŚŠŽŹŻ'-]+(\s*[a-zA-ZàáâäãåāèéêëēėęîïíīįìôöòóœøōõûüùúūÿýçćčñńßśšžźżÀÁÂÄÃÅĀÈÉÊËĒĖĘÎÏÍĪĮÌÔÖÒÓŒØŌÕÛÜÙÚŪŸÝÇĆČÑŃßŚŠŽŹŻ'-]*)+$/;
	const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const passwordRegexp = /^[^<>.]{6,32}$/;

	return (
		<form
			onSubmit={handleSubmit(handleSignUp)}
			className="rounded-lg shadow-md bg-white text-zinc-800 max-w-96 mx-auto">
			<div className="flex flex-col space-y-1.5 p-6">
				<h3 className="whitespace-nowrap text-2xl font-semibold text-center">
					Sign Up
				</h3>
				<p className="text-sm text-center">
					Create your account to start ordering delicious food.
				</p>
			</div>
			<div className="p-6 space-y-3">
				<div className="space-y-1">
					<label className="text-sm font-medium" htmlFor="name">
						Name
					</label>
					<input
						className={`${
							errors && errors["name"]
								? errorClasses
								: "border-orange-100 focus:border-orange-600"
						} flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-offset-0 outline-none`}
						id="name"
						placeholder="Enter your name"
						{...register("name", {
							required: {
								value: true,
								message: "You have not filled in your name"
							},
							pattern: {
								value: fullNameRegexp,
								message: "Use a valid name"
							},
							maxLength: 64
						})}
					/>
					<small className="text-red-500">
						{errors && errors["name"] && errors["name"].message}
					</small>
				</div>
				<div className="space-y-1">
					<label className="text-sm font-medium" htmlFor="email">
						Email
					</label>
					<input
						className={`${
							errors && errors["email"]
								? errorClasses
								: "border-orange-100 focus:border-orange-600"
						} flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-offset-0 outline-none`}
						id="email"
						placeholder="Enter your email"
						type="email"
						{...register("email", {
							required: {
								value: true,
								message: "You have not filled in your email"
							},
							pattern: {
								value: emailRegexp,
								message: "Use a valid email"
							},
							maxLength: 64
						})}
					/>
					<small className="text-red-500">
						{errors && errors["email"] && errors["email"].message}
					</small>
				</div>
				<div className="space-y-1">
					<label className="text-sm font-medium" htmlFor="password">
						Password
					</label>
					<input
						className={`${
							errors && errors["password"]
								? errorClasses
								: "border-orange-100 focus:border-orange-600"
						} flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-offset-0 outline-none`}
						id="password"
						placeholder="Enter your password"
						type="password"
						{...register("password", {
							required: {
								value: true,
								message: "You have not filled in your password"
							},
							pattern: {
								value: passwordRegexp,
								message: "Use a stronger password"
							},
							maxLength: {
								value: 32,
								message: "Password is too long"
							},
							minLength: {
								value: 6,
								message: "Password is too short"
							}
						})}
					/>
					<small className="text-red-500">
						{errors &&
							errors["password"] &&
							errors["password"].message}
					</small>
				</div>
				<div className="text-sm">
					<input
						className="accent-orange-600"
						type="checkbox"
						name="accept"
						id="accept-terms"
						{...register("acceptTerms", { required: true })}
					/>{" "}
					<label htmlFor="accept-terms">
						You have read and agree to all our{" "}
						<Link
							className="text-orange-600 underline"
							to={"/terms"}>
							Terms of use
						</Link>
					</label>
				</div>
			</div>
			<div className="flex items-center p-6">
				<button
					disabled={!isValid || isSubmitting}
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-orange-600 h-10 px-4 py-2 w-full text-white disabled:opacity-45 disabled:cursor-not-allowed"
					type="submit">
					{isSubmitting ? (
						<CgSpinner className="animate-spin" />
					) : (
						"Sign Up"
					)}
				</button>
			</div>
		</form>
	);
};

export default SignUpForm;
