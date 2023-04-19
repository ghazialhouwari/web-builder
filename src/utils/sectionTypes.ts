export interface SectionStyles {
	sectionTheme: string;
	sectionHeight: 'small' | 'medium' | 'large';
	customSectionHeight: number;
	verticalAlignment: 'top' | 'center' | 'bottom';
	backgroundColor: string;
	backgroundMode: 'image' | 'video' | 'color';
}

export interface SectionBreakPointSettings {
	rows: number;
	columns: number;
}

export interface SectionBreakpoints<T> {
	mobile: T;
	desktop: T;
}

export interface SectionPosition {
	x: number;
	y: number;
}

export interface SectionContentLayout {
	start: SectionPosition;
	end: SectionPosition;
	zIndex: number;
}

export interface SectionContentText {
	engine: string;
	html: string;
}

export interface SectionContentQuote {
	quote: string;
	source: string;
}

export interface SectionContentLink {
	linkTo: string;
	newWindow: boolean;
}

export interface SectionContentButton {
	buttonText: string;
	action: SectionContentLink;
	buttonAlignment: 'top' | 'center' | 'bottom';
	buttonSize: 'small' | 'medium' | 'large';
}

export interface SectionContentImage {
	url: string;
	action: SectionContentLink;
	stretch: true;
	altText: string;
}

export interface SectionContent {
	id: string;
	layout: SectionBreakpoints<SectionContentLayout>;
	value:
		| SectionContentText
		| SectionContentQuote
		| SectionContentButton
		| SectionContentImage;
}

export interface Section {
	id: string;
	sectionName: string;
	sourceType: 'blank' | 'section';
	style: SectionStyles;
	breakpointSettins: SectionBreakpoints<SectionBreakPointSettings>;
	content: SectionContent[];
}

export interface Config {
	sections: Section[];
}
