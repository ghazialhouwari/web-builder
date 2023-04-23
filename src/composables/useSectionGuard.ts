import { deepClone, generateUUID } from '@/utils';
import {
	ButtonSectionBlock,
	ImageSectionBlock,
	QuoteSectionBlock,
	SectionBlock,
	SectionBlockButton,
	SectionBlockImage,
	SectionBlockLayout,
	SectionBlockQuote,
	SectionBlockText,
	SectionBreakpoints,
	SiteBlock,
	TextSectionBlock,
} from '@/utils/types';

export default function useSectionGuard(
	block: SiteBlock,
	blockLayout: SectionBlockLayout
): SectionBlock {
	const id = generateUUID();
	const layout: SectionBreakpoints<SectionBlockLayout> = {
		desktop: blockLayout,
		mobile: blockLayout,
	};
	switch (block.type) {
		case 'button':
			const sectionButton: ButtonSectionBlock = {
				id,
				type: block.type,
				value: block.value as SectionBlockButton,
				layout,
			};
			return deepClone(sectionButton);

		case 'text':
			const sectionText: TextSectionBlock = {
				id,
				type: block.type,
				value: block.value as SectionBlockText,
				layout,
			};
			return sectionText;

		case 'quote':
			const sectionQuote: QuoteSectionBlock = {
				id,
				type: block.type,
				value: block.value as SectionBlockQuote,
				layout,
			};
			return sectionQuote;

		case 'image':
			const sectionImage: ImageSectionBlock = {
				id,
				type: block.type,
				value: block.value as SectionBlockImage,
				layout,
			};
			return sectionImage;

		default:
			throw new Error('Unknown section');
	}
}
