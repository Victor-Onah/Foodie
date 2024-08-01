const SignUpFormOptimisticUi = () => {
	return (
		<div className="rounded-lg shadow-md bg-white max-w-96 mx-auto">
			<div className="flex flex-col space-y-1.5 p-6 animate-pulse">
				<div className="h-8 max-w-48 rounded-lg bg-zinc-100 mx-auto"></div>
				<div className="h-8 rounded-lg bg-zinc-100"></div>
				<div className="h-8 max-w-48 rounded-lg bg-zinc-100 mx-auto"></div>
			</div>
			<div className="p-6 space-y-4 animate-pulse">
				<div className="h-10 rounded-lg bg-zinc-100"></div>
				<div className="h-10 rounded-lg bg-zinc-100"></div>
				<div className="h-10 rounded-lg bg-orange-100"></div>
			</div>
		</div>
	);
};

export default SignUpFormOptimisticUi;
