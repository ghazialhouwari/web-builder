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
			verticalAlignment: 'center',
			horizontalAlignment: 'center',
			contentAlignment: 'center',
			buttonSize: 'default',
			fluid: true,
			color: '#FFF',
			backgroundColor: '#1867C0',
			cornerRadius: {
				topLeft: {
					unit: 'px',
					value: 4,
				},
				topRight: {
					unit: 'px',
					value: 4,
				},
				bottomLeft: {
					unit: 'px',
					value: 4,
				},
				bottomRight: {
					unit: 'px',
					value: 4,
				},
			},
			padding: {
				top: {
					unit: 'px',
					value: 0,
				},
				right: {
					unit: 'px',
					value: 16,
				},
				bottom: {
					unit: 'px',
					value: 0,
				},
				left: {
					unit: 'px',
					value: 16,
				},
			},
			shape: 'elevated',
		},
	},
	{
		id: '12',
		icon: 'mdi-image-outline',
		type: 'image',
		layout: {
			size: {
				columns: 8,
				rows: 8,
			},
			zIndex: 1,
		},
		value: {
			url: null,
			action: null,
			stretch: true,
			altText: '',
		},
	},
	// mdi-image-outline 6x6
	// mdi-video-outline 6x6
];
