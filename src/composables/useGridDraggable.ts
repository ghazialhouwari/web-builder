import { SectionBlockLayout, SectionBreakpoints } from '@/utils/types';
import { useGridStore } from '@/store/grid';
import { useSectionsStore } from '@/store/sections';
import { offsetToBlockLayout } from '@/utils/grid';

export default function useGridDraggable(sectionIndex: number) {
	const gridStore = useGridStore();
	const sectionsStore = useSectionsStore();

	function moveStartHandler() {
		gridStore.setIsDragging(true);
	}
	function moveHandler(
		x: number,
		y: number,
		blockLayout: SectionBreakpoints<SectionBlockLayout>
	) {
		const layout = blockLayout[gridStore.viewType];
		const rowSize = layout.end.y - layout.start.y;
		const columnSize = layout.end.x - layout.start.x;

		const draggedBlockLayout = offsetToBlockLayout(
			x,
			y,
			columnSize,
			rowSize,
			layout.zIndex
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
				gridStore.viewType
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
