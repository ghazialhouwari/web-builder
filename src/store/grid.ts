import { defineStore } from 'pinia';
import { ref, readonly, reactive, toRefs } from 'vue';
import { Grid, SectionBlockLayout, ViewType } from '@/utils/types';
import { calculatedGrid } from '@/utils/grid';

export const useGridStore = defineStore('grid', () => {
	const viewType = ref<ViewType>('desktop');
	const grid = reactive<Grid>(calculatedGrid(viewType.value));

	const isDragging = ref(false);
	const isResizing = ref(false);
	const draggedBlockLayout = ref<SectionBlockLayout | null>(null);

	const activeSectionIndex = ref<number | null>(null);
	const activeSectionRowCount = ref<number>(grid.minRowCount);

	function setDraggedBlockLayout(layout: SectionBlockLayout | null) {
		draggedBlockLayout.value = layout;
	}

	function setDraggedBlockLayoutPosition(
		direction: 'start' | 'end',
		position: 'x' | 'y',
		value: number
	) {
		if (!draggedBlockLayout.value) return;
		draggedBlockLayout.value[direction][position] = value;
	}

	function updateGrid() {
		Object.assign(grid, calculatedGrid(viewType.value));
	}

	function setIsDragging(value: boolean) {
		isDragging.value = value;
	}
	function setIsResizing(value: boolean) {
		isResizing.value = value;
	}

	function setActiveSectionIndex(value: number | null) {
		if (!isDragging.value) {
			activeSectionIndex.value = value;
		}
	}

	function setActiveSectionRowCount(value: number) {
		activeSectionRowCount.value = value + 1;
	}

	function setViewType(value: ViewType) {
		viewType.value = value;
		updateGrid();
	}

	return {
		...toRefs(grid),
		isDragging: readonly(isDragging),
		isResizing: readonly(isResizing),
		draggedBlockLayout: readonly(draggedBlockLayout),
		activeSectionIndex: readonly(activeSectionIndex),
		activeSectionRowCount: readonly(activeSectionRowCount),
		viewType: readonly(viewType),
		updateGrid,
		setActiveSectionRowCount,
		setDraggedBlockLayout,
		setDraggedBlockLayoutPosition,
		setIsDragging,
		setIsResizing,
		setActiveSectionIndex,
		setViewType,
	};
});
