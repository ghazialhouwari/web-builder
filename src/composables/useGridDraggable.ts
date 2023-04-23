import { useGridStore } from '@/store/grid';
import { useSectionsStore } from '@/store/sections';
import useGrid from '@/composables/useGrid';
import { Section, SectionBlockLayout } from '@/utils/types';

export default function useGridDraggable(
	section: Section,
	sectionIndex: number
) {
	const gridStore = useGridStore();
	const sectionsStore = useSectionsStore();
	const { viewType, offsetToBlockLayout } = useGrid();

	function moveStartHandler() {
		gridStore.setIsDragging(true);
		gridStore.setSectionIndex(sectionIndex);
	}
	function moveHandler(x: number, y: number, blockLayout: SectionBlockLayout) {
		const rowSize = blockLayout.end.y - blockLayout.start.y;
		const columnSize = blockLayout.end.x - blockLayout.start.x;

		const draggedBlockLayout = offsetToBlockLayout(
			x,
			y,
			columnSize,
			rowSize,
			blockLayout.zIndex
		);
		gridStore.setDraggedBlockLayout(draggedBlockLayout);
	}

	function moveEndHandler(blockIndex: number) {
		gridStore.setIsDragging(false);
		if (gridStore.draggedBlockLayout) {
			sectionsStore.updateSectionBlockLayoutByIndex(
				sectionIndex,
				blockIndex,
				gridStore.draggedBlockLayout,
				viewType.value
			);
			gridStore.updateSectionRowCount(gridStore.draggedBlockLayout.end.y);
			gridStore.resetDraggedBlockLayout();
		}
	}

	return {
		moveStartHandler,
		moveHandler,
		moveEndHandler,
	};
}
