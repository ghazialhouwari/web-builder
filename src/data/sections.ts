import { Section } from '@/utils/types';

export const sections: Section[] = [
	{
		id: '64406bda1fb0624a9e090072',
		sectionName: 'BLANK_NAME',
		sourceType: 'blank',
		styles: {
			sectionTheme: 'light-bold',
			sectionHeight: 'medium',
			customSectionHeight: 10,
			verticalAlignment: 'center',
			backgroundColor: '#f6f6f6',
			backgroundMode: 'color',
		},
		layout: {
			mobile: {
				rows: 27,
				columns: 8,
			},
			desktop: {
				rows: 12,
				columns: 24,
			},
		},
		blocks: [
			{
				id: '1234',
				type: 'button',
				value: {
					buttonText: 'Learn more',
					action: {
						linkTo: 'https://bobapps.co',
						newWindow: false,
					},
					buttonAlignment: 'center',
					buttonSize: 'medium',
				},
				layout: {
					desktop: {
						start: {
							x: 3,
							y: 1,
						},
						end: {
							x: 7,
							y: 3,
						},
						zIndex: 3,
					},
					mobile: {
						start: {
							x: 1,
							y: 15,
						},
						end: {
							x: 4,
							y: 16,
						},
						zIndex: 3,
					},
				},
			},
		],
	},
	{
		id: '64406bda1fb0624a9e090073',
		sectionName: 'BLANK_NAME_2',
		sourceType: 'blank',
		styles: {
			sectionTheme: 'light-bold',
			sectionHeight: 'medium',
			customSectionHeight: 10,
			verticalAlignment: 'center',
			backgroundColor: '#f6f6f6',
			backgroundMode: 'color',
		},
		layout: {
			mobile: {
				rows: 27,
				columns: 8,
			},
			desktop: {
				rows: 12,
				columns: 24,
			},
		},
		blocks: [
			{
				id: '12345',
				type: 'button',
				value: {
					buttonText: 'Learn more',
					action: {
						linkTo: 'https://bobapps.co',
						newWindow: false,
					},
					buttonAlignment: 'center',
					buttonSize: 'medium',
				},
				layout: {
					desktop: {
						start: {
							x: 11,
							y: 2,
						},
						end: {
							x: 15,
							y: 4,
						},
						zIndex: 3,
					},
					mobile: {
						start: {
							x: 1,
							y: 15,
						},
						end: {
							x: 4,
							y: 16,
						},
						zIndex: 3,
					},
				},
			},
		],
	},
];
