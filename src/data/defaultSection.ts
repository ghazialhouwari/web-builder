import { Section } from '@/utils/types';

export const defaultBlankSection: Section = {
	id: '',
	sectionName: 'New Section',
	sourceType: 'blank',
	styles: {
		sectionTheme: '',
		sectionHeight: 'medium',
		customSectionHeight: 0,
		verticalAlignment: 'top',
		backgroundColor: '#FFF',
		backgroundMode: 'color',
	},
	layout: {
		mobile: {
			rows: 1,
			columns: 1,
		},
		desktop: {
			rows: 1,
			columns: 1,
		},
	},
	blocks: [],
};
