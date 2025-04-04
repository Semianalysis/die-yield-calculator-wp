import { useEffect, EffectCallback, DependencyList } from "react";

/**
 * useEffect, but wrapped in a debouncer
 * @param effect The effect callback to run
 * @param deps The dependency list
 * @param delay The debounce delay in milliseconds
 */
export function useDebouncedEffect(
	effect: EffectCallback,
	deps: DependencyList | undefined,
	delay: number,
) {
	useEffect(() => {
		const handler = setTimeout(() => effect(), delay);

		return () => clearTimeout(handler);
	}, [...(deps || []), delay]);
}
