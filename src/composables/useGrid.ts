import { ref, reactive, toRefs, onMounted, onUnmounted, computed } from 'vue';
import { ViewType } from '@/utils/types';
import { useGridStore } from '@/store/grid';
import { useSectionsStore } from '@/store/sections';
import { SectionBlockLayout } from '@/utils/types';

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
	const viewType = ref<ViewType>('desktop');

	const rowCount = computed(() => {
		const sectionRowCount = gridStore.sectionLayout?.rows ?? 1;
		const draggableBlockRowCount = gridStore.draggedBlockLayout?.end.y ?? 1;
		return (
			Math.max(grid.minRowCount, sectionRowCount, draggableBlockRowCount) - 1
		);
	});

	function handleResize() {
		Object.assign(grid, calculateGrid());
		viewType.value = window.innerWidth > 767 ? 'desktop' : 'mobile';
	}

	function offsetToBlockLayout(
		x: number,
		y: number,
		columnSize: number,
		rowSize: number,
		zIndex: number
	): SectionBlockLayout {
		const offsetX = x + window.scrollX - grid.gutters + grid.gap;
		const offsetY = y + window.scrollY - (gridWrapper.value?.offsetTop || 0);

		// Get grid row and column from grid item offset
		const gridColumn = Math.ceil(offsetX / (grid.cellWidth + grid.gap));
		const gridRow = Math.round(offsetY / (grid.cellHeight + grid.gap));

		const columnStart = Math.max(1, gridColumn + 1);
		const rowStart = Math.max(1, gridRow + 1);
		const columnEnd = columnStart + columnSize;
		const rowEnd = rowStart + rowSize;

		return {
			start: {
				x: columnStart,
				y: rowStart,
			},
			end: {
				x: columnEnd,
				y: rowEnd,
			},
			zIndex,
		};
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
		viewType,
		gridWrapper,
		offsetToBlockLayout,
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
