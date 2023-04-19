import { defineStore } from 'pinia';
import { ref, reactive, readonly } from 'vue';
import { IGridItem, IGridItemArea } from '@/utils/types';

export const useGridStore = defineStore('grid', () => {
	const items = reactive<IGridItem[]>([
		{
			gridArea: {
				rowStart: 2,
				columnStart: 2,
				rowEnd: 4,
				columnEnd: 8,
			},
			block: {
				title: 'Text',
				value: 'text',
				icon: 'mdi-format-text',
				columnSize: 6,
				rowSize: 2,
			},
		},
		{
			gridArea: {
				rowStart: 4,
				columnStart: 8,
				rowEnd: 10,
				columnEnd: 14,
			},
			block: {
				title: 'Image',
				value: 'image',
				icon: 'mdi-image-outline',
				columnSize: 6,
				rowSize: 6,
			},
		},
	]);

	const isDragging = ref(false);
	const draggedGridItemArea = ref<IGridItemArea>();

	function updateItemGridAreaByIndex(index: number, gridArea: IGridItemArea) {
		items[index].gridArea = gridArea;
	}

	function updateDraggedGridItemArea(gridArea: IGridItemArea) {
		draggedGridItemArea.value = gridArea;
	}

	function updateIsDragging(value: boolean) {
		isDragging.value = value;
	}

	function addItem(item: IGridItem) {
		items.push(item);
	}

	return {
		items: readonly(items),
		draggedGridItemArea: readonly(draggedGridItemArea),
		isDragging: readonly(isDragging),
		updateItemGridAreaByIndex,
		updateDraggedGridItemArea,
		updateIsDragging,
		addItem,
	};
});
