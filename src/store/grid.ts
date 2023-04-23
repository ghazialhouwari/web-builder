import { defineStore } from 'pinia';
import { ref, readonly } from 'vue';
import { SectionBlockLayout, SectionLayout } from '@/utils/types';

export const useGridStore = defineStore('grid', () => {
	const isDragging = ref(false);
	const sectionIndex = ref<number | null>(0);
	const draggedBlockLayout = ref<SectionBlockLayout | null>(null);
	const sectionLayout = ref<SectionLayout>();

	function setDraggedBlockLayout(layout: SectionBlockLayout) {
		draggedBlockLayout.value = layout;
	}

	function setSectionLayout(layout: SectionLayout) {
		sectionLayout.value = layout;
	}

	function updateSectionRowCount(rowCount: number) {
		if (sectionLayout.value && rowCount > sectionLayout.value.rows) {
			sectionLayout.value.rows = rowCount;
		}
	}

	function resetDraggedBlockLayout() {
		draggedBlockLayout.value = null;
	}

	function updateIsDragging(value: boolean) {
		isDragging.value = value;
	}

	function setSectionIndex(value: number) {
		sectionIndex.value = value;
	}
	function resetSectionIndex() {
		sectionIndex.value = null;
	}

	return {
		draggedBlockLayout: readonly(draggedBlockLayout),
		isDragging: readonly(isDragging),
		sectionLayout: readonly(sectionLayout),
		sectionIndex: readonly(sectionIndex),
		setSectionLayout,
		setDraggedBlockLayout,
		resetDraggedBlockLayout,
		updateIsDragging,
		setSectionIndex,
		resetSectionIndex,
		updateSectionRowCount,
	};
});
