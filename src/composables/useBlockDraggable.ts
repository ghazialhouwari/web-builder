import { ref, Ref } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useGridStore } from '@/store/grid';
import { BlockType, SectionBlockLayout, SiteBlock } from '@/utils/types';
import { offsetToBlockLayout } from '@/utils/grid';

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
	onEnd?: (
		sectionIndex: number,
		type: BlockType,
		layout: SectionBlockLayout
	) => void;
}) {
	const gridStore = useGridStore();
	const { setIsDragging, setDraggedBlockLayout } = gridStore;

	const offset = ref({ x: 0, y: 0 });
	const isDragging = ref(false);
	const width = ref<number>();
	const height = ref<number>();

	function updateDraggedBlockLayout(x: number, y: number) {
		const draggedBlockLayout = offsetToBlockLayout(
			x,
			y,
			block.layout.size.columns,
			block.layout.size.rows,
			block.layout.zIndex
		);
		setDraggedBlockLayout(draggedBlockLayout);
	}

	function setOffset(x: number, y: number) {
		offset.value.x = x + window.scrollX;
		offset.value.y = y + window.scrollY;
	}

	function setInitialValues(x: number, y: number) {
		if (!blockItem.value) return;

		width.value = blockItem.value.offsetWidth;
		height.value = blockItem.value.offsetHeight;

		const rect = blockItem.value.getBoundingClientRect();

		setOffset(rect.left, rect.top);
		updateDraggedBlockLayout(rect.left, rect.top);
	}

	function resetValues() {
		setOffset(0, 0);
		setDraggedBlockLayout(null);
	}

	function updateIsDragging(value: boolean) {
		isDragging.value = value;
		setIsDragging(value);
	}

	useDraggable(blockItem, {
		onStart: ({ x, y }) => {
			setInitialValues(x, y);
			updateIsDragging(true);
			onStart && onStart();
		},
		onMove: ({ x, y }) => {
			onMove && onMove(x, y);
			setOffset(x, y);
			updateDraggedBlockLayout(x, y);
		},
		onEnd: () => {
			updateIsDragging(false);
			const { activeSectionIndex, draggedBlockLayout } = gridStore;
			onEnd && onEnd(activeSectionIndex!, block.type, draggedBlockLayout!);
			resetValues();
		},
	});

	return { isDragging, offset, width, height };
}
