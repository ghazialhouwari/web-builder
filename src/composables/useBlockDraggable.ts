import { ref, Ref } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useGridStore } from '@/store/grid';
import useGrid from '@/composables/useGrid';
import { IBlock } from '@/utils/types';

export default function useBlockDraggable({
	blockItem,
	block,
	onStart,
	onMove,
	onEnd,
}: {
	blockItem: Ref<HTMLElement | null>;
	block: IBlock;
	onStart?: () => void;
	onMove?: (x: number, y: number) => void;
	onEnd?: () => void;
}) {
	const gridStore = useGridStore();
	const offset = ref({ x: 0, y: 0 });
	const isDragging = ref(false);

	const width = ref<number>();
	const height = ref<number>();

	const { offsetToGridArea } = useGrid();

	function updateBlockOffset(x: number, y: number) {
		const draggedItemGridArea = offsetToGridArea(
			x,
			y,
			block.columnSize,
			block.rowSize
		);
		gridStore.updateDraggedGridItemArea(draggedItemGridArea);
		offset.value.x = x;
		offset.value.y = y;
	}

	function resetBlockOffset() {
		offset.value.x = 0;
		offset.value.y = 0;
	}

	useDraggable(blockItem, {
		onStart: () => {
			if (blockItem.value) {
				width.value = blockItem.value.offsetWidth;
				height.value = blockItem.value.offsetHeight;
				updateBlockOffset(blockItem.value.offsetLeft, blockItem.value.offsetTop);
			}
			isDragging.value = true;
			gridStore.updateIsDragging(true);
			onStart && onStart();
		},
		onMove: ({ x, y }) => {
			onMove && onMove(x, y);
			updateBlockOffset(x, y);
		},
		onEnd: () => {
			isDragging.value = false;
			gridStore.updateIsDragging(false);
			resetBlockOffset();
			onEnd && onEnd();
		},
	});

	return { isDragging, offset, width, height };
}
