import { defineStore } from 'pinia';
import { ref, readonly, reactive, toRefs } from 'vue';
import {
	Grid,
	GridActivationEvents,
	SectionBlockLayout,
	ViewType,
} from '@/utils/types';
import { calculatedGrid } from '@/utils/grid';

export const useGridStore = defineStore('grid', () => {
	const viewType = ref<ViewType>('desktop');
	const grid = reactive<Grid>(calculatedGrid(viewType.value));

	const isGridActive = ref(false);
	const gridActiveEvent = ref<GridActivationEvents>();

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

	function activateGrid(event: GridActivationEvents) {
		isGridActive.value = true;
		gridActiveEvent.value = event;
	}

	function deactivateGrid() {
		isGridActive.value = false;
		gridActiveEvent.value = undefined;
	}

	function setActiveSectionIndex(value: number | null) {
		if (!isGridActive.value) {
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
		isGridActive: readonly(isGridActive),
		gridActiveEvent: readonly(gridActiveEvent),
		draggedBlockLayout: readonly(draggedBlockLayout),
		activeSectionIndex: readonly(activeSectionIndex),
		activeSectionRowCount: readonly(activeSectionRowCount),
		viewType: readonly(viewType),
		updateGrid,
		activateGrid,
		deactivateGrid,
		setActiveSectionRowCount,
		setDraggedBlockLayout,
		setDraggedBlockLayoutPosition,
		setActiveSectionIndex,
		setViewType,
	};
});
