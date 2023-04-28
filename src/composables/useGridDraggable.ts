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
			const section = sectionsStore.sections[gridStore.activeSectionIndex!];
			sectionsStore.setSectionBlockLayoutByIndex(
				sectionIndex,
				blockIndex,
				gridStore.draggedBlockLayout,
				gridStore.viewType
			);
			if (
				gridStore.draggedBlockLayout.end.y - 1 >
				section.layout[gridStore.viewType].rows
			) {
				sectionsStore.setSectionRowCountByIndex(
					gridStore.activeSectionIndex!,
					gridStore.viewType,
					gridStore.draggedBlockLayout.end.y - 1
				);
			}
			gridStore.setDraggedBlockLayout(null);
		}
	}

	return {
		moveStartHandler,
		moveHandler,
		moveEndHandler,
	};
}
