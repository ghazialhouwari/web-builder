import { reactive, Ref } from 'vue';
import { useGridStore } from '@/store/grid';
import { useSectionsStore } from '@/store/sections';
import { SectionBlock, SectionBlockLayout } from '@/utils/types';
import useDrag from '@/composables/useDrag';
import { deepClone } from '@/utils';

export default function useBlockResize({
	block,
	blockIndex,
	resizeHandleRef,
}: {
	block: SectionBlock;
	blockIndex: number;
	resizeHandleRef: Ref<HTMLElement | null>;
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
		console.log('onMouseDown');
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
		console.log('onMouseUp');
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
		console.log(element);
		return (
			element.classList.contains('block__resize-handle') &&
			!!element.dataset.directions
		);
	}

	function getDirectionsFromElement(element: HTMLElement): string[] {
		console.log(element);
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

	const dragging = useDrag(resizeHandleRef, onMouseDown, onMouseMove, onMouseUp);

	return { rows: state.rows, columns: state.columns };
}
