import { ref, reactive, toRefs, onMounted, onUnmounted, computed } from 'vue';
import { IGridItemArea } from '@/utils/types';
import { useGridStore } from '@/store/grid';

interface Grid {
	gap: number;
	gutters: number;
	cellWidth: number;
	cellHeight: number;
	columnCount: number;
	minRowCount: number;
}

export default function useGrid() {
	const gridStore = useGridStore();
	const grid = reactive<Grid>(calculateGrid());
	const gridWrapper = ref<HTMLElement | null>(null);

	const rowCount = computed(() => {
		const rowEnd = gridStore.draggedGridItemArea?.rowEnd || 0;
		const rowCount = gridStore.items.reduce(
			(max, item) => Math.max(max, item.gridArea.rowEnd),
			grid.minRowCount
		);
		return Math.max(rowCount, rowEnd) - 1;
	});

	function handleResize() {
		Object.assign(grid, calculateGrid());
	}

	function offsetToGridArea(
		x: number,
		y: number,
		columnSize: number,
		rowSize: number
	): IGridItemArea {
		const offsetX = grid.gutters + grid.gap;
		const offsetY = gridWrapper.value?.offsetTop || 0;

		// Get grid row and column from grid item offset
		const gridColumn = Math.ceil((x - offsetX) / (grid.cellWidth + grid.gap));
		const gridRow = Math.round((y - offsetY) / (grid.cellHeight + grid.gap));

		const columnStart = Math.max(1, gridColumn + 1);
		const rowStart = Math.max(1, gridRow + 1);
		const columnEnd = columnStart + columnSize;
		const rowEnd = rowStart + rowSize;

		return { rowStart, columnStart, rowEnd, columnEnd };
	}

	function setGridWrapper() {
		gridWrapper.value = document.querySelector('#gridWrapper');
	}

	onMounted(() => {
		setGridWrapper();
		window.addEventListener('resize', handleResize);
	});
	onUnmounted(() => window.removeEventListener('resize', handleResize));

	return {
		...toRefs(grid),
		rowCount,
		gridWrapper,
		offsetToGridArea,
	};
}

function calculateGrid(): Grid {
	const viewPort = window.innerWidth;

	const gap = 11;
	const columnCount = 24;
	const minRowCount = 8;
	const rowHeightRatio = 0.0215;
	const minContainerWidth = 1400;

	const gutters = viewPort * 0.02 - gap;
	const gapCount = (columnCount - 1) * gap;
	const containerWidth = viewPort - gutters * 2 - gap * 2;

	const width = Math.min(minContainerWidth, containerWidth);
	const height = minRowCount * width * rowHeightRatio + gap * (minRowCount - 1);

	const cellWidth = (width - gapCount) / columnCount;
	const cellHeight = width * rowHeightRatio;

	return {
		gap,
		gutters,
		cellWidth,
		cellHeight,
		columnCount,
		minRowCount,
	};
}
