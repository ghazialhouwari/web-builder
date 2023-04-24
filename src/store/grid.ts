import { defineStore } from 'pinia';
import { ref, readonly } from 'vue';
import {
	SectionBlockLayout,
	SectionBreakpoints,
	SectionLayout,
	ViewType,
} from '@/utils/types';

export const useGridStore = defineStore('grid', () => {
	const isDragging = ref(false);
	const sectionIndex = ref<number | null>(0);
	const draggedBlockLayout = ref<SectionBlockLayout | null>(null);
	const sectionLayout = ref<SectionLayout>();
	const viewType = ref<ViewType>('desktop');

	function setDraggedBlockLayout(layout: SectionBlockLayout) {
		draggedBlockLayout.value = layout;
	}

	function setSectionLayout(layout: SectionBreakpoints<SectionLayout>) {
		sectionLayout.value = layout[viewType.value];
	}

	function updateSectionRowCount(rowCount: number) {
		if (sectionLayout.value && rowCount > sectionLayout.value.rows) {
			sectionLayout.value.rows = rowCount;
		}
	}

	function resetDraggedBlockLayout() {
		draggedBlockLayout.value = null;
	}

	function setIsDragging(value: boolean) {
		isDragging.value = value;
	}

	function setSectionIndex(value: number) {
		sectionIndex.value = value;
	}

	function resetSectionIndex() {
		sectionIndex.value = null;
	}

	function setViewType(value: ViewType) {
		viewType.value = value;
	}

	return {
		draggedBlockLayout: readonly(draggedBlockLayout),
		isDragging: readonly(isDragging),
		sectionLayout: readonly(sectionLayout),
		sectionIndex: readonly(sectionIndex),
		viewType: readonly(viewType),
		setSectionLayout,
		setDraggedBlockLayout,
		resetDraggedBlockLayout,
		setIsDragging,
		setSectionIndex,
		resetSectionIndex,
		updateSectionRowCount,
		setViewType,
	};
});
