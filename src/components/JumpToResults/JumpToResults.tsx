import React, { useState, useEffect, RefObject } from 'react';

interface JumpToResultsProps {
	outputRef: RefObject<HTMLDivElement>;
}

export function JumpToResults({ outputRef }: JumpToResultsProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				// Update state based on visibility of the output element
				setIsVisible(!entry.isIntersecting);
			});
		};

		const observer = new IntersectionObserver(handleIntersection, {
			root: null, // Use the viewport as the root
			threshold: 0 // Trigger when the element is not visible
		});

		if (outputRef.current) {
			observer.observe(outputRef.current); // Start observing the output element
		}

		// Clean up observer on component unmount
		return () => {
			if (outputRef.current) {
				observer.unobserve(outputRef.current);
			}
		};
	}, [outputRef]);

	const scrollToOutput = () => {
		if (outputRef.current) {
			outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<button
			type="button"
			className={isVisible ? 'jump-to-results' : 'jump-to-results--hidden'}
			onClick={scrollToOutput}
		>
			Jump to Results
		</button>
	);
}
