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
	verticalAlignment: 'top' | 'center' | 'bottom';
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
	buttonAlignment: 'top' | 'center' | 'bottom';
	buttonSize: 'x-small' | 'small' | 'default' | 'large' | 'x-large';
	fluid: boolean;
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
	| 'ADD_SECTION';

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
