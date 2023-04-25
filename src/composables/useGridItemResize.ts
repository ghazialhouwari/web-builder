import { onBeforeUnmount, onMounted, Ref, ref } from 'vue';
import useGrid from '@/composables/useGrid';
import { useGridStore } from '@/store/grid';
import { SectionBlock, SectionBlockLayout } from '@/utils/types';

export default function useGridItemResize({
	block,
	resizeHandle,
	onResize,
}: {
	block: SectionBlock;
	resizeHandle: Ref<HTMLElement | null>;
	onResize?: (layout: SectionBlockLayout) => void;
}) {
	interface Position {
		x: number;
		y: number;
	}

	const rows = ref(0);
	const columns = ref(0);
	const isDown = ref(false);
	const start: Position = { x: 0, y: 0 };
	const end: Position = { x: 0, y: 0 };
	const gridStore = useGridStore();
	const { cellWidth, cellHeight, gap } = gridStore;
	let directions: string[] = [];

	function mouseDownHandler(evt: MouseEvent) {
		const element = evt.target as HTMLElement;
		if (
			element.classList.contains('resize__handle') &&
			element.dataset.directions
		) {
			directions = element.dataset.directions.split(',');
		}
		start.x = evt.clientX;
		start.y = evt.clientY;
		end.x = evt.clientX;
		end.y = evt.clientY;
		isDown.value = true;
		gridStore.setIsDragging(true);
		window.addEventListener('mouseup', mouseUpHandler);
		window.addEventListener('mousemove', mouseMoveHanlder);
	}

	function mouseUpHandler() {
		isDown.value = false;
		gridStore.setIsDragging(false);
		if (gridStore.draggedBlockLayout) {
			onResize && onResize(gridStore.draggedBlockLayout!);
			gridStore.updateSectionRowCount(gridStore.draggedBlockLayout?.end.y ?? 1);
			gridStore.resetDraggedBlockLayout();
		}

		window.removeEventListener('mousemove', mouseMoveHanlder);
		window.removeEventListener('mouseup', mouseUpHandler);
	}

	function mouseMoveHanlder(evt: MouseEvent) {
		if (isDown.value) {
			end.x = evt.clientX;
			end.y = evt.clientY;
			const { columns, rows } = columnRowCountFromOffset(start, end);

			const layout: SectionBlockLayout = {
				start: {
					x: block.layout[gridStore.viewType].start.x,
					y: block.layout[gridStore.viewType].start.y,
				},
				end: {
					x: block.layout[gridStore.viewType].end.x,
					y: block.layout[gridStore.viewType].end.y,
				},
				zIndex: block.layout[gridStore.viewType].zIndex,
			};

			if (
				(directions.includes('center') ||
					directions.includes('top') ||
					directions.includes('bottom')) &&
				directions.includes('left')
			) {
				if (layout.start.x + columns < layout.end.x) {
					layout.start.x += columns;
					gridStore.setDraggedBlockLayout(layout);
				}
			}
			if (
				(directions.includes('center') ||
					directions.includes('left') ||
					directions.includes('right')) &&
				directions.includes('top')
			) {
				if (layout.start.y + rows < layout.end.y) {
					layout.start.y += rows;
					gridStore.setDraggedBlockLayout(layout);
				}
			}
			if (
				(directions.includes('center') ||
					directions.includes('top') ||
					directions.includes('bottom')) &&
				directions.includes('right')
			) {
				if (
					layout.end.x + columns > layout.start.x &&
					layout.end.x + columns < gridStore.columnCount + 4
				) {
					layout.end.x += columns;
					gridStore.setDraggedBlockLayout(layout);
				}
			}
			if (
				(directions.includes('center') ||
					directions.includes('left') ||
					directions.includes('right')) &&
				directions.includes('bottom')
			) {
				if (layout.end.y + rows > layout.start.y) {
					layout.end.y += rows;
					gridStore.setDraggedBlockLayout(layout);
				}
			}
		}
	}

	function columnRowCountFromOffset(
		start: Position,
		end: Position
	): { columns: number; rows: number } {
		const distanceX = end.x - start.x;
		const distanceY = end.y - start.y;

		// Get grid row and column from grid item offset
		const columns = Math.round(distanceX / (cellWidth + gap));
		const rows = Math.round(distanceY / (cellHeight + gap));

		return { columns, rows };
	}

	onMounted(() =>
		resizeHandle.value?.addEventListener('mousedown', mouseDownHandler)
	);

	onBeforeUnmount(() =>
		resizeHandle.value?.addEventListener('mousedown', mouseDownHandler)
	);

	return { rows, columns };
}
