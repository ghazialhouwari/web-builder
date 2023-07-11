export interface UnitValue {
	unit: 'px';
	value: number;
}

export interface KeyValuePair {
	key: string;
	value: any;
}

export interface CornerRadius {
	topLeft: UnitValue;
	topRight: UnitValue;
	bottomLeft: UnitValue;
	bottomRight: UnitValue;
}

export interface Padding {
	top: UnitValue;
	right: UnitValue;
	bottom: UnitValue;
	left: UnitValue;
}

export type ViewType = 'desktop' | 'mobile';
export type BlockType = 'text' | 'quote' | 'button' | 'image';
export type BlockComponentType =
	| 'textBlock'
	| 'quoteBlock'
	| 'buttonBlock'
	| 'imageBlock';

export interface SectionStyles {
	sectionTheme: string;
	sectionHeight: 'small' | 'medium' | 'large';
	customSectionHeight: number;
	verticalAlignment: 'start' | 'center' | 'end';
	backgroundColor: string;
	backgroundMode: 'image' | 'video' | 'color';
}

export interface SectionLayout {
	rows: number;
	columns: number;
}

export interface SectionBreakpoints<T> {
	mobile: T;
	desktop: T;
}

export interface Position {
	x: number;
	y: number;
}

export interface SectionBlockLayout {
	start: Position;
	end: Position;
	zIndex: number;
}

export interface SectionBlockText {
	engine: string;
	html: string;
}

export interface SectionBlockQuote {
	quote: string;
	source: string;
}

export interface SectionBlockLink {
	linkTo: string;
	newWindow: boolean;
}

export interface SectionBlockButton {
	buttonText: string;
	action: SectionBlockLink;
	verticalAlignment: 'start' | 'center' | 'end';
	horizontalAlignment: 'start' | 'center' | 'end';
	contentAlignment: 'start' | 'center' | 'end';
	buttonSize: 'x-small' | 'small' | 'default' | 'large' | 'x-large';
	cornerRadius: CornerRadius;
	padding: Padding;
	fluid: boolean;
	color: string;
	backgroundColor: string;
	shape: 'elevated' | 'tonal' | 'outlined' | 'text' | 'plain';
}

export interface SectionBlockImage {
	url: string;
	action: SectionBlockLink;
	stretch: true;
	altText: string;
}

export type SectionBlockValue =
	| SectionBlockText
	| SectionBlockQuote
	| SectionBlockButton
	| SectionBlockImage;

export interface SectionBlockBase {
	id: string;
	type: BlockType;
	layout: SectionBreakpoints<SectionBlockLayout>;
}

export interface TextSectionBlock extends SectionBlockBase {
	type: 'text';
	value: SectionBlockText;
}

export interface QuoteSectionBlock extends SectionBlockBase {
	type: 'quote';
	value: SectionBlockQuote;
}

export interface ButtonSectionBlock extends SectionBlockBase {
	type: 'button';
	value: SectionBlockButton;
}

export interface ImageSectionBlock extends SectionBlockBase {
	type: 'image';
	value: SectionBlockImage;
}

export type SectionBlock =
	| TextSectionBlock
	| QuoteSectionBlock
	| ButtonSectionBlock
	| ImageSectionBlock;

export interface Section {
	id: string;
	sectionName: string;
	sourceType: 'blank' | 'section';
	styles: SectionStyles;
	layout: SectionBreakpoints<SectionLayout>;
	blocks: SectionBlock[];
}

export interface SiteBlockLayout<T> {
	size: T;
	zIndex: number;
}

export interface SiteBlock {
	id: string;
	icon: string;
	type: BlockType;
	layout: SiteBlockLayout<SectionLayout>;
	value: SectionBlockValue;
}

export type ActionType =
	| 'ADD_BLOCK'
	| 'UPDATE_SECTION_BLOCK_LAYOUT'
	| 'SHIFT_SECTION_UP'
	| 'SHIFT_SECTION_DOWN'
	| 'SET_SECTION_ROW_COUNT'
	| 'REMOVE_SECTION'
	| 'ADD_SECTION'
	| 'UPDATE_SECTION_BACKGROUND_COLOR'
	| 'DUPLICATE_BLOCK'
	| 'UPDATE_BLOCK_VALUE';

export type BlocksComponenets = {
	[key in BlockComponentType]: any;
};

export interface Grid {
	gap: number;
	gutters: number;
	cellWidth: number;
	cellHeight: number;
	columnCount: number;
	minRowCount: number;
}

export type GridActivationEvents =
	| 'DRAG_SECTION_BLOCK'
	| 'DRAG_MENU_BLOCK'
	| 'RESIZE_SECTION'
	| 'RESIZE_BLOCK';

export interface BlockSpecs {
	minColumns: number;
	minRows: number;
}
export type BlocksSpecs = {
	[key in BlockType]: BlockSpecs;
};

export type Direction = 'top' | 'right' | 'bottom' | 'left';
