// app/components/withWindow.tsx
import {
	type ComponentType,
	type PropsWithChildren,
	useEffect,
	useState,
} from "react";

/**
 * Wraps a component so it only renders on the client (when `window` is defined).
 */
export function withWindow<T extends {}>(WrappedComponent: ComponentType<T>) {
	return function WithWindow(props: PropsWithChildren<T>) {
		const [hasWindow, setHasWindow] = useState(false);

		useEffect(() => {
			if (typeof window !== "undefined") {
				setHasWindow(true);
			}
		}, []);

		if (!hasWindow) {
			// you could return a loader here if you prefer
			return null;
		}

		return <WrappedComponent {...(props as T)} />;
	};
}
