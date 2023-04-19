export interface IGridItemArea {
	rowStart: number;
	columnStart: number;
	rowEnd: number;
	columnEnd: number;
}

export interface IGridItem {
	gridArea: IGridItemArea;
	block: IBlock;
}

export interface IBlock {
	title: string;
	value: string;
	icon: string;
	rowSize: number;
	columnSize: number;
}
