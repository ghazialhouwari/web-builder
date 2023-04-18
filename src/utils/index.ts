export const gridAreaToArray = (gridArea: string): number[] => {
	return gridArea.split('/').map(Number);
};
