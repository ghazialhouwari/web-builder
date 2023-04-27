import { defineStore } from 'pinia';
import { ref, readonly, reactive, toRefs } from 'vue';
import {
	Grid,
	SectionBlockLayout,
	SectionBreakpoints,
	SectionLayout,
	ViewType,
} from '@/utils/types';
import { calculatedGrid } from '@/utils/grid';

export const useGridStore = defineStore('grid', () => {
	const isDragging = ref(false);
	const sectionIndex = ref<number | null>(1);
	const draggedBlockLayout = ref<SectionBlockLayout | null>(null);
	const sectionLayout = ref<SectionLayout>();
	const viewType = ref<ViewType>('desktop');
	const grid = reactive<Grid>(calculatedGrid(viewType.value));

	function setDraggedBlockLayout(layout: SectionBlockLayout) {
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

	function setSectionLayout(layout: SectionBreakpoints<SectionLayout>) {
		sectionLayout.value = layout[viewType.value];
	}

	function updateSectionRowCount(rowCount: number) {
		if (sectionLayout.value && rowCount > sectionLayout.value.rows) {
			sectionLayout.value.rows = rowCount;
		}
	}

	function updateGrid() {
		Object.assign(grid, calculatedGrid(viewType.value));
	}

	function resetDraggedBlockLayout() {
		draggedBlockLayout.value = null;
	}

	function setIsDragging(value: boolean) {
		isDragging.value = value;
	}

	function setSectionIndex(value: number) {
		if (!isDragging.value) {
			sectionIndex.value = value;
		}
	}

	function resetSectionIndex() {
		sectionIndex.value = null;
	}

	function setViewType(value: ViewType) {
		viewType.value = value;
		updateGrid();
	}

	return {
		...toRefs(grid),
		draggedBlockLayout: readonly(draggedBlockLayout),
		isDragging: readonly(isDragging),
		sectionLayout: readonly(sectionLayout),
		sectionIndex: readonly(sectionIndex),
		viewType: readonly(viewType),
		updateGrid,
		setSectionLayout,
		setDraggedBlockLayout,
		setDraggedBlockLayoutPosition,
		resetDraggedBlockLayout,
		setIsDragging,
		setSectionIndex,
		resetSectionIndex,
		updateSectionRowCount,
		setViewType,
	};
});
