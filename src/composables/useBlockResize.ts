import { reactive, Ref } from 'vue';
import { useGridStore } from '@/store/grid';
import { useSectionsStore } from '@/store/sections';
import { SectionBlock } from '@/utils/types';
import useDrag from '@/composables/useDrag';
import { deepClone } from '@/utils';
import { blocksSpecs } from '@/data/blocksSpecs';

export default function useBlockResize({
	block,
	blockIndex,
	handles,
}: {
	block: SectionBlock;
	blockIndex: number;
	handles: string[];
}) {
	const gridStore = useGridStore();
	const sectionsStore = useSectionsStore();

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
		gridStore.activateGrid('RESIZE_BLOCK');
		dragging.attachMouseListeners();
	}

	function onMouseMove(evt: MouseEvent) {
		if (gridStore.isGridActive && state.directions.length) {
			state.end.x = evt.clientX;
			state.end.y = evt.clientY;

			updateGridDimensionsFromOffset();
			updateDraggedBlockLayout();
		}
	}

	function onMouseUp() {
		gridStore.deactivateGrid();

		if (gridStore.draggedBlockLayout) {
			const section = sectionsStore.sections[gridStore.activeSectionIndex!];

			sectionsStore.setSectionBlockLayoutByIndex(
				gridStore.activeSectionIndex!,
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

		dragging.removeMouseListeners();
	}

	function isResizeHandle(element: HTMLElement): boolean {
		return !!element.dataset.directions;
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

	function updateDraggedBlockLayout() {
		const layout = deepClone(block.layout[gridStore.viewType]);
		const diff = {
			x: Math.abs(layout.end.x - layout.start.x),
			y: Math.abs(layout.end.y - layout.start.y),
		};
		const minColumns = blocksSpecs[block.type].minColumns;
		const minRows = blocksSpecs[block.type].minRows;

		const actions: Record<string, () => void> = {
			left: () => {
				const startX = layout.start.x + state.columns;
				if (startX > 0 && startX < layout.end.x) {
					if (diff.x - state.columns >= minColumns) {
						gridStore.setDraggedBlockLayoutPosition('start', 'x', startX);
						gridStore.removeDraggedBlockEdgeError('left');
					} else {
						gridStore.setDraggedBlockEdgeError('left');
					}
				}
			},
			top: () => {
				const startY = layout.start.y + state.rows;
				if (startY > 0 && startY < layout.end.y) {
					if (diff.y - state.rows >= minRows) {
						gridStore.setDraggedBlockLayoutPosition('start', 'y', startY);
						gridStore.removeDraggedBlockEdgeError('top');
					} else {
						gridStore.setDraggedBlockEdgeError('top');
					}
				}
			},
			right: () => {
				const endX = layout.end.x + state.columns;
				if (endX > layout.start.x && endX < gridStore.columnCount + 4) {
					if (diff.x + state.columns >= minColumns) {
						gridStore.setDraggedBlockLayoutPosition('end', 'x', endX);
						gridStore.removeDraggedBlockEdgeError('right');
					} else {
						gridStore.setDraggedBlockEdgeError('right');
					}
				}
			},
			bottom: () => {
				const endY = layout.end.y + state.rows;
				if (endY > layout.start.y) {
					if (diff.y + state.rows >= minRows) {
						gridStore.setDraggedBlockLayoutPosition('end', 'y', endY);
						gridStore.removeDraggedBlockEdgeError('bottom');
					} else {
						gridStore.setDraggedBlockEdgeError('bottom');
					}
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
	const dragging = useDrag(handles, onMouseDown, onMouseMove, onMouseUp);

	return { rows: state.rows, columns: state.columns };
}
