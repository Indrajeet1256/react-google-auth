import { useMemo } from "react";
import { useTimer } from "react-timer-hook";

type Props = {
	handleSignOut: () => void;
	expiry: Date;
};

const Timer = ({ handleSignOut, expiry }: Props) => {
	const { seconds, minutes, isRunning } = useTimer({
		expiryTimestamp: expiry,
		onExpire: handleSignOut,
	});

	const { sec, min } = useMemo(
		() => ({
			sec: seconds < 10 ? `0${seconds}` : seconds,
			min: minutes > 9 ? minutes : `0${minutes}`,
		}),
		[seconds, minutes]
	);

	return (
		<div className="font-inter-regular text-sm text-white  px-3 py-2  rounded-lg pointer-events-none  relative overflow-hidden z-10">
			<div
				className={`absolute inset-0 bg-gray-700 -z-10  ${
					isRunning && "animate-pulse"
				}`}></div>
			<span className="">{min}</span>:<span className="">{sec}</span>
		</div>
	);
};
export default Timer;
