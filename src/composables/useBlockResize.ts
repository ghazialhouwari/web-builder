import { reactive, Ref } from 'vue';
import { useGridStore } from '@/store/grid';
import { SectionBlock, SectionBlockLayout } from '@/utils/types';
import useDrag from '@/composables/useDrag';
import { deepClone } from '@/utils';

export default function useBlockResize({
	block,
	resizeHandle,
	onResize,
}: {
	block: SectionBlock;
	resizeHandle: Ref<HTMLElement | null>;
	onResize?: (layout: SectionBlockLayout) => void;
}) {
	const gridStore = useGridStore();

	const state = reactive({
		rows: 0,
		columns: 0,
		start: { x: 0, y: 0 },
		end: { x: 0, y: 0 },
		directions: [] as string[],
	});

	const { cellWidth, cellHeight, gap } = gridStore;

	function onMouseDown(evt: MouseEvent) {
		const element = evt.target as HTMLElement;

		if (isResizeHandle(element)) {
			state.directions = getDirectionsFromElement(element);
		}
		gridStore.setDraggedBlockLayout(deepClone(block.layout[gridStore.viewType]));
		updateStartAndEndPositions(evt.clientX, evt.clientY);
		gridStore.setIsDragging(true);
		dragging.attachMouseListeners();
	}

	function onMouseMove(evt: MouseEvent) {
		if (gridStore.isDragging && state.directions.length) {
			state.end.x = evt.clientX;
			state.end.y = evt.clientY;

			updateGridDimensionsFromOffset();
			updateDraggedBlockLayout();
		}
	}

	function onMouseUp() {
		gridStore.setIsDragging(false);

		if (gridStore.draggedBlockLayout) {
			onResize?.(gridStore.draggedBlockLayout);
			updateGridStore(gridStore.draggedBlockLayout);
		}

		dragging.removeMouseListeners();
	}

	function isResizeHandle(element: HTMLElement): boolean {
		return (
			element.classList.contains('resize__handle') && !!element.dataset.directions
		);
	}

	function getDirectionsFromElement(element: HTMLElement): string[] {
		return element.dataset.directions?.split(',') ?? [];
	}

	function updateStartAndEndPositions(clientX: number, clientY: number): void {
		state.start.x = clientX;
		state.start.y = clientY;
		state.end.x = clientX;
		state.end.y = clientY;
	}

	function updateGridStore(layout: SectionBlockLayout) {
		gridStore.updateSectionRowCount(layout.end.y);
		gridStore.resetDraggedBlockLayout();
	}

	function updateDraggedBlockLayout() {
		const layout = deepClone(block.layout[gridStore.viewType]);
		const actions: Record<string, () => void> = {
			left: () => {
				const startX = layout.start.x + state.columns;
				if (startX > 0 && startX < layout.end.x) {
					gridStore.setDraggedBlockLayoutPosition('start', 'x', startX);
				}
			},
			top: () => {
				const startY = layout.start.y + state.rows;
				if (startY > 0 && startY < layout.end.y) {
					gridStore.setDraggedBlockLayoutPosition('start', 'y', startY);
				}
			},
			right: () => {
				const endX = layout.end.x + state.columns;
				if (endX > layout.start.x && endX < gridStore.columnCount + 4) {
					gridStore.setDraggedBlockLayoutPosition('end', 'x', endX);
				}
			},
			bottom: () => {
				const endY = layout.end.y + state.rows;
				if (endY > layout.start.y) {
					gridStore.setDraggedBlockLayoutPosition('end', 'y', endY);
				}
			},
		};

		state.directions.forEach((direction) => actions[direction]?.());
	}

	function updateGridDimensionsFromOffset(): void {
		const distanceX = state.end.x - state.start.x;
		const distanceY = state.end.y - state.start.y;

		// Get grid row and column from grid item offset
		state.columns = Math.round(distanceX / (cellWidth + gap));
		state.rows = Math.round(distanceY / (cellHeight + gap));
	}

	const dragging = useDrag(resizeHandle, onMouseDown, onMouseMove, onMouseUp);

	return { rows: state.rows, columns: state.columns };
}