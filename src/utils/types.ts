export interface IGridItemArea {
	rowStart: number;
	columnStart: number;
	rowEnd: number;
	columnEnd: number;
}

export interface IGridItem {
	content: string;
	gridArea: IGridItemArea;
}
