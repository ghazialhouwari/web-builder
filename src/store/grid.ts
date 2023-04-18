import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IGridItem } from '@/utils/types';
import { gridAreaToArray } from '@/utils';

export const useGridStore = defineStore('grid', () => {
	const items = ref<IGridItem[]>([
		{
			content: 'Item 1',
			style: {
				gridArea: '2/2/4/6',
				transform: 'translate(0, 0)',
			},
		},
		{
			content: 'Item 2',
			style: {
				gridArea: '4/8/6/14',
				transform: 'translate(0, 0)',
			},
		},
	]);

	function getItemGridAreaByIndex(index: number) {
		return gridAreaToArray(items.value[index].style.gridArea);
	}

	function updateItemTransformByIndex(index: number, x: number, y: number) {
		items.value[index].style.transform = `translate(${x}px, ${y}px)`;
	}
	function updateItemGridAreaByIndex(index: number, gridArea: string) {
		items.value[index].style.gridArea = gridArea;
	}

	return {
		items,
		getItemGridAreaByIndex,
		updateItemTransformByIndex,
		updateItemGridAreaByIndex,
	};
});
