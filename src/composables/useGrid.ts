import {
	ref,
	reactive,
	toRefs,
	onMounted,
	onUnmounted,
	computed,
	watch,
} from 'vue';
import { useGridStore } from '@/store/grid';
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

	const rowCount = computed(() => {
		const sectionRowCount = gridStore.sectionLayout?.rows ?? 1;
		const draggableBlockRowCount = gridStore.draggedBlockLayout?.end.y ?? 1;
		return (
			Math.max(grid.minRowCount, sectionRowCount, draggableBlockRowCount) - 1
		);
	});

	function updateGrid() {
		Object.assign(grid, calculateGrid());
	}
	function handleResize() {
		updateGrid();
		if (gridStore.viewType === 'desktop' && window.innerWidth <= 767) {
			gridStore.setViewType('mobile');
		} else if (gridStore.viewType === 'mobile' && window.innerWidth > 767) {
			gridStore.setViewType('desktop');
		}
	}

	function setGridWrapper() {
		gridWrapper.value = document.querySelector('#gridWrapper');
	}

	function offsetToBlockLayout(
		x: number,
		y: number,
		columnSize: number,
		rowSize: number,
		zIndex: number
	): SectionBlockLayout {
		const wrapperOffsetLeft = gridWrapper.value?.offsetLeft || 0;
		const wrapperOffsetTop = gridWrapper.value?.offsetTop || 0;

		const offsetX =
			x + window.scrollX - wrapperOffsetLeft - grid.gutters + grid.gap;
		const offsetY = y + window.scrollY - wrapperOffsetTop;

		// Get grid row and column from grid item offset
		let gridColumn = Math.ceil(offsetX / (grid.cellWidth + grid.gap));
		const gridRow = Math.round(offsetY / (grid.cellHeight + grid.gap));

		if (gridColumn > 1 && gridColumn + columnSize > grid.columnCount + 2) {
			gridColumn = grid.columnCount + 2 - columnSize;
		}

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

	function calculateGrid(): Grid {
		const { viewType } = gridStore;
		const viewPort = viewType === 'desktop' ? window.innerWidth : 430;

		const gap = 11;
		const columnCount = viewType === 'desktop' ? 24 : 8;
		const minRowCount = 8;
		const rowHeightRatio = 0.0215;
		const minContainerWidth = 1400;

		const guttersPercent = viewType === 'desktop' ? 0.02 : 0.06;
		const baseGutters = viewPort * guttersPercent - gap;
		const frGutters = (viewPort - minContainerWidth) / 2 - gap;

		const gutters = viewPort < minContainerWidth ? baseGutters : frGutters;
		const gapCount = (columnCount - 1) * gap;
		const containerWidth = viewPort - gutters * 2 - gap * 2;

		const width = Math.min(minContainerWidth, containerWidth);

		const cellWidth = (width - gapCount) / columnCount;
		const cellHeight = viewType === 'desktop' ? width * rowHeightRatio : 26;

		return {
			gap,
			gutters,
			cellWidth,
			cellHeight,
			columnCount,
			minRowCount,
		};
	}

	watch(
		() => gridStore.viewType,
		(newValue, oldValue) => {
			updateGrid();
		}
	);

	onMounted(() => {
		setGridWrapper();
		window.addEventListener('resize', handleResize);
	});
	onUnmounted(() => window.removeEventListener('resize', handleResize));

	return {
		...toRefs(grid),
		rowCount,
		gridWrapper,
		offsetToBlockLayout,
	};
}
