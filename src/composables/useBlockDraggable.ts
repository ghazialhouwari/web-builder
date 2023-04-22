import { ref, Ref } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useGridStore } from '@/store/grid';
import useGrid from '@/composables/useGrid';
import { SiteBlock } from '@/utils/types';

export default function useBlockDraggable({
	blockItem,
	block,
	onStart,
	onMove,
	onEnd,
}: {
	blockItem: Ref<HTMLElement | null>;
	block: SiteBlock;
	onStart?: () => void;
	onMove?: (x: number, y: number) => void;
	onEnd?: () => void;
}) {
	const gridStore = useGridStore();
	const offset = ref({ x: 0, y: 0 });
	const isDragging = ref(false);

	const width = ref<number>();
	const height = ref<number>();

	const { offsetToBlockLayout } = useGrid();

	function updateBlockOffset(x: number, y: number) {
		const draggedBlockLayout = offsetToBlockLayout(
			x,
			y,
			block.layout.size.columns,
			block.layout.size.rows,
			block.layout.zIndex
		);
		gridStore.setDraggedBlockLayout(draggedBlockLayout);
		offset.value.x = x + window.scrollX;
		offset.value.y = y + window.scrollY;
	}

	function resetBlockOffset() {
		offset.value.x = 0;
		offset.value.y = 0;
	}

	useDraggable(blockItem, {
		onStart: ({ x, y }) => {
			if (blockItem.value) {
				width.value = blockItem.value.offsetWidth;
				height.value = blockItem.value.offsetHeight;

				const rect = blockItem.value.getBoundingClientRect();
				x = rect.left;
				y = rect.top;
				updateBlockOffset(x, y);
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
			onEnd && onEnd();
			resetBlockOffset();
			gridStore.resetDraggedBlockLayout();
		},
	});

	return { isDragging, offset, width, height };
}
