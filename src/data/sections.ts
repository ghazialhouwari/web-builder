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
			{
				id: '12345',
				type: 'image',
				value: {
					url: 'https://bobofficialbucket.s3.us-west-2.amazonaws.com/nTwqPhdVyd6qUWBiZ/0eF0tWy05KSJ8yn1mZU2ZC8nigSY4s.png',
					action: null,
					stretch: false,
					altText: '',
				},
				layout: {
					desktop: {
						start: {
							x: 10,
							y: 4,
						},
						end: {
							x: 16,
							y: 9,
						},
						zIndex: 1,
					},
					mobile: {
						start: {
							x: 5,
							y: 6,
						},
						end: {
							x: 8,
							y: 10,
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
				id: '123456',
				type: 'button',
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
