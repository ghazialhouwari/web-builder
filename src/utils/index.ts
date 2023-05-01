export const gridAreaToArray = (gridArea: string): number[] => {
	return gridArea.split('/').map(Number);
};

export const generateUUID = (): string => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export function deepClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null;

	return function (...args: Parameters<T>) {
		const later = () => {
			if (timeout) clearTimeout(timeout);
			// @ts-ignore
			func.apply(this, args);
		};

		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
