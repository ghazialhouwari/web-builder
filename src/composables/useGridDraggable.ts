import { IGridItemArea } from '@/utils/types';
import { useGridStore } from '@/store/grid';
import useGrid from '@/composables/useGrid';

export default function useGridDraggable() {
	const gridStore = useGridStore();
	const { offsetToGridArea } = useGrid();

	function moveStartHandler() {
		gridStore.updateIsDragging(true);
	}

	function moveHandler(x: number, y: number, gridArea: IGridItemArea) {
		const rowSize = gridArea.rowEnd - gridArea.rowStart;
		const columnSize = gridArea.columnEnd - gridArea.columnStart;

		const draggedItemGridArea = offsetToGridArea(x, y, columnSize, rowSize);
		gridStore.updateDraggedGridItemArea(draggedItemGridArea);
	}

	function moveEndHandler(index: number) {
		gridStore.updateIsDragging(false);
		if (gridStore.draggedGridItemArea) {
			gridStore.updateItemGridAreaByIndex(index);
		}
	}

	return {
		moveStartHandler,
		moveHandler,
		moveEndHandler,
	};
}
