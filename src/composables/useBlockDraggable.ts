import { ref, Ref } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useGridStore } from '@/store/grid';
import useGrid from '@/composables/useGrid';

export default function useBlockDraggable({
	blockItem,
	onStart,
	onMove,
	onEnd,
}: {
	blockItem: Ref<HTMLElement | null>;
	onStart?: () => void;
	onMove?: (x: number, y: number) => void;
	onEnd?: () => void;
}) {
	const gridStore = useGridStore();
	const offset = ref({ x: 0, y: 0 });
	const isDragging = ref(false);

	const { offsetToGridArea } = useGrid();

	function updateBlockOffset(x: number, y: number) {
		const draggedItemGridArea = offsetToGridArea(x, y, 6, 2);
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

	return { isDragging, offset };
}
