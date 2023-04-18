import { ref, computed } from 'vue';
import { IGridItemArea } from '@/utils/types';
import { useGridStore } from '@/store/grid';

export default function useGrid() {
	const gridStore = useGridStore();

	const isDragging = ref(false);
	const draggedGridItemArea = ref<IGridItemArea>();

	const gridRowCount = computed(() => {
		const rowEnd = draggedGridItemArea.value?.rowEnd || 0;
		return Math.max(gridStore.grid.rowCount, rowEnd) - 1;
	});

	function moveEndHandler(index: number) {
		isDragging.value = false;
		gridStore.updateItemGridAreaByIndex(index, draggedGridItemArea.value!);
	}

	function moveHandler(x: number, y: number, gridArea: IGridItemArea) {
		isDragging.value = true;

		const rowSize = gridArea.rowEnd - gridArea.rowStart;
		const columnSize = gridArea.columnEnd - gridArea.columnStart;

		draggedGridItemArea.value = offsetToGridArea(x, y, columnSize, rowSize);
	}

	function offsetToGridArea(
		x: number,
		y: number,
		columnSize: number,
		rowSize: number
	): IGridItemArea {
		const { grid } = gridStore;

		// Get grid row and column from grid item offset
		const gridColumn = Math.ceil(
			(x - grid.gutters + grid.gap) / (grid.cellWidth + grid.gap)
		);
		const gridRow = Math.round(y / (grid.cellHeight + grid.gap));

		const columnStart = Math.max(1, gridColumn + 1);
		const rowStart = Math.max(1, gridRow + 1);
		const columnEnd = columnStart + columnSize;
		const rowEnd = rowStart + rowSize;

		return { rowStart, columnStart, rowEnd, columnEnd };
	}

	return {
		isDragging,
		draggedGridItemArea,
		gridRowCount,
		moveHandler,
		moveEndHandler,
	};
}
