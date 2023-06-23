import { useCallback, useEffect, useRef, useState } from "react";

export const CountDownComponent = (props) => {
	const { ti_me, handleTimeEnd } = props
	const Ref = useRef(null);
	const [timer, setTimer] = useState(null)
	/* test timer function*/
	const getTimeRemaining = (time) => {
		const total = Date.parse(time) - Date.parse(new Date());
		const seconds = Math.floor((total % (1000 * 60)) / 1000);
		const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
		const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		return {
			total, hours, minutes, seconds
		};
	}

	const startTimer = useCallback((e) => {
		let { total, hours, minutes, seconds }
			= getTimeRemaining(e);
		if (total >= 0) {
			setTimer(
				(hours > 9 ? hours : '0' + hours) + ':' +
				(minutes > 9 ? minutes : '0' + minutes) + ':'
				+ (seconds > 9 ? seconds : '0' + seconds)
			)
		}
	}, [])

	const clearTimer = useCallback((e) => {
		setTimer();
		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);

		}, 1000)
		Ref.current = id;
	}, [startTimer])

	const getDeadTime = useCallback(() => {
		let deadline = new Date();
		deadline.setHours(deadline.getHours() + (ti_me / 60));
		deadline.setMinutes(deadline.getMinutes() + (ti_me % 60));
		return deadline;
	}, [ti_me])
	/* test timer function*/
	useEffect(() => {
		if (ti_me) {
			clearTimer(getDeadTime());
		}
	}, [clearTimer, getDeadTime, ti_me])

	useEffect(() => {
		if (timer === "00:00:00") {
			handleTimeEnd()
		}
	})

	return (<>
		<span className="test-timer">{timer}</span>
	</>)
}


