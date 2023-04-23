import { SiteBlock } from '@/utils/types';

export const blocks: SiteBlock[] = [
	{
		id: '11',
		icon: 'mdi-button-pointer',
		type: 'button',
		layout: {
			size: {
				columns: 6,
				rows: 2,
			},
			zIndex: 1,
		},
		value: {
			buttonText: 'Learn more',
			action: {
				linkTo: 'https://bobapps.co',
				newWindow: false,
			},
			buttonAlignment: 'center',
			fluid: true,
			buttonSize: 'default',
		},
	},
	// mdi-image-outline 6x6
	// mdi-video-outline 6x6
];
