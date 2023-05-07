import { ref, Ref } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useGridStore } from '@/store/grid';
import { useSectionsStore } from '@/store/sections';
import { onClickOutside } from '@vueuse/core';
import { SectionBlock } from '@/utils/types';
import { offsetToBlockLayout } from '@/utils/grid';

interface Args {
	gridItemRef: Ref<HTMLElement | null>;
	dragHandleRef: Ref<HTMLElement | null>;
	block: SectionBlock;
	blockIndex: number;
	onStartDrag?: () => void;
	onMoveDrag?: (x: number, y: number) => void;
	onEndDrag?: () => void;
}

export default function useGridItemDraggable({
	gridItemRef,
	dragHandleRef,
	block,
	blockIndex,
	onStartDrag,
	onMoveDrag,
	onEndDrag,
}: Args) {
	const gridStore = useGridStore();
	const sectionsStore = useSectionsStore();

	const offset = ref({ x: 0, y: 0 });
	const isDragging = ref(false);

	// Update the item offset
	function updateItemOffset(x: number, y: number) {
		const gridWrapper: HTMLElement | null = document.querySelector(
			`#gridWrapper${gridStore.activeSectionIndex}`
		);

		const blockOffsetLeft = gridItemRef.value?.offsetLeft || 0;
		const blockOffsetTop = gridItemRef.value?.offsetTop || 0;
		const wrapperOffsetLeft = gridWrapper?.getBoundingClientRect().left || 0;
		const wrapperOffsetTop = gridWrapper?.getBoundingClientRect().top || 0;

		offset.value.x = x - wrapperOffsetLeft - blockOffsetLeft;
		offset.value.y = y - wrapperOffsetTop - blockOffsetTop;
	}

	// Reset the item offset
	function resetItemOffset() {
		offset.value.x = 0;
		offset.value.y = 0;
	}

	// Update the grid block layout
	function updateGridBlockLayout(x: number, y: number) {
		const layout = block.layout[gridStore.viewType];
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

	// Update the section block layout
	function updateSectionBlockLayout() {
		const { draggedBlockLayout, viewType, activeSectionIndex } = gridStore;

		if (!draggedBlockLayout || activeSectionIndex === null) return;

		const section = sectionsStore.sections[activeSectionIndex];
		sectionsStore.setSectionBlockLayoutByIndex(
			activeSectionIndex,
			blockIndex,
			draggedBlockLayout,
			viewType
		);
		if (draggedBlockLayout.end.y - 1 > section.layout[viewType].rows) {
			sectionsStore.setSectionRowCountByIndex(
				activeSectionIndex!,
				viewType,
				draggedBlockLayout.end.y - 1
			);
		}
	}

	// Use draggable composable
	useDraggable(gridItemRef, {
		handle: dragHandleRef,
		onStart: () => {
			gridStore.activateGrid('DRAG_SECTION_BLOCK');
			gridStore.setFocusedBlock(null);
			isDragging.value = true;
			onStartDrag?.();
		},
		onMove: ({ x, y }) => {
			updateGridBlockLayout(x, y);
			updateItemOffset(x, y);
			onMoveDrag?.(x, y);
		},
		onEnd: () => {
			updateSectionBlockLayout();
			gridStore.deactivateGrid();
			isDragging.value = false;
			gridStore.setFocusedBlock(block.id);
			gridStore.setDraggedBlockLayout(null);
			resetItemOffset();
			onEndDrag?.();
		},
	});

	// Handle click outside
	onClickOutside(gridItemRef, () => {
		if (gridStore.focusedBlockId === block.id) {
			gridStore.setFocusedBlock(null);
		}
	});

	return { offset, isDragging };
}
