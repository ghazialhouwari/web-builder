import { defineStore } from 'pinia';
import { ref, readonly, reactive, toRefs } from 'vue';
import {
	Direction,
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
	const focusedBlockId = ref<string | null>(null);
	const isBlockSettingsVisible = ref<boolean>(false);

	const draggedBlockLayout = ref<SectionBlockLayout | null>(null);
	const draggedBlockEdgeError = ref<Direction[]>([]);

	const activeSectionIndex = ref<number | null>(null);
	const activeSectionRowCount = ref<number>(grid.minRowCount);

	function setDraggedBlockLayout(layout: SectionBlockLayout | null) {
		draggedBlockLayout.value = layout;
		if (!layout) {
			draggedBlockEdgeError.value = [];
		}
	}

	function setDraggedBlockLayoutPosition(
		direction: 'start' | 'end',
		position: 'x' | 'y',
		value: number
	) {
		if (!draggedBlockLayout.value) return;
		draggedBlockLayout.value[direction][position] = value;
	}

	function setDraggedBlockEdgeError(direction: Direction) {
		if (!draggedBlockEdgeError.value.includes(direction)) {
			draggedBlockEdgeError.value.push(direction);
		}
	}

	function removeDraggedBlockEdgeError(direction: Direction) {
		if (draggedBlockEdgeError.value.includes(direction)) {
			draggedBlockEdgeError.value = draggedBlockEdgeError.value.filter(
				(dir) => dir !== direction
			);
		}
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

	function setFocusedBlock(value: string | null) {
		focusedBlockId.value = value;
	}

	function setBlockSettingsVisibility(value: boolean) {
		isBlockSettingsVisible.value = value;
	}

	return {
		...toRefs(grid),
		isGridActive: readonly(isGridActive),
		gridActiveEvent: readonly(gridActiveEvent),
		focusedBlockId: readonly(focusedBlockId),
		draggedBlockLayout: readonly(draggedBlockLayout),
		draggedBlockEdgeError: readonly(draggedBlockEdgeError),
		activeSectionIndex: readonly(activeSectionIndex),
		activeSectionRowCount: readonly(activeSectionRowCount),
		viewType: readonly(viewType),
		isBlockSettingsVisible: readonly(isBlockSettingsVisible),
		updateGrid,
		activateGrid,
		deactivateGrid,
		setActiveSectionRowCount,
		setDraggedBlockLayout,
		setDraggedBlockLayoutPosition,
		setActiveSectionIndex,
		setViewType,
		setFocusedBlock,
		setBlockSettingsVisibility,
		setDraggedBlockEdgeError,
		removeDraggedBlockEdgeError,
	};
});
