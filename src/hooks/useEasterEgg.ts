import { useEffect, useState } from "react";

export function useEasterEgg() {
	const [easterEggEnabled, setEasterEggEnabled] = useState(false);

	useEffect(() => {
		const sequence = ['t', 's', 'm', 'c'];
		let keyIndex = 0;
		let timeOut: ReturnType<typeof setTimeout>;

		const listenerCb = (e: KeyboardEvent) => {
			// Clear previous timeout
			clearTimeout(timeOut);

			// Handle keypress
			if (e.key === sequence[keyIndex]) {
				if (keyIndex === sequence.length - 1) {
					// If we are at the end of the sequence, unlock the easter egg
					setEasterEggEnabled(true);
				} else {
					// Otherwise continue to the next key in the sequence
					keyIndex++;
				}
			} else {
				keyIndex = 0;
			}

			// User has 2s between key entries before sequence resets
			timeOut = setTimeout(() => keyIndex = 0, 2000);
		};
		window.addEventListener('keydown', listenerCb);

		// Remove key listener when component unmounts
		return () => window.removeEventListener('keydown', listenerCb)
	}, []);

	return easterEggEnabled;
}
