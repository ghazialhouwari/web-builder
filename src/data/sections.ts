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
				rows: 10,
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
					verticalAlignment: 'center',
					horizontalAlignment: 'center',
					buttonSize: 'default',
					fluid: false,
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
						zIndex: 1,
					},
					mobile: {
						start: {
							x: 4,
							y: 3,
						},
						end: {
							x: 7,
							y: 5,
						},
						zIndex: 1,
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
				rows: 10,
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
					verticalAlignment: 'center',
					horizontalAlignment: 'center',
					buttonSize: 'default',
					fluid: true,
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
						zIndex: 1,
					},
					mobile: {
						start: {
							x: 3,
							y: 3,
						},
						end: {
							x: 8,
							y: 5,
						},
						zIndex: 1,
					},
				},
			},
		],
	},
];
