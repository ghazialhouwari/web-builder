import { ref, Ref } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useGridStore } from '@/store/grid';
import { onClickOutside } from '@vueuse/core';

export default function useGridItemDraggable({
	gridItem,
	dragHandle,
	onStart,
	onMove,
	onEnd,
}: {
	gridItem: Ref<HTMLElement | null>;
	dragHandle: Ref<HTMLElement | null>;
	onStart?: () => void;
	onMove?: (x: number, y: number) => void;
	onEnd?: () => void;
}) {
	const offset = ref({ x: 0, y: 0 });
	const isFocused = ref(false);
	const isDragging = ref(false);
	const gridStore = useGridStore();

	/** Functions */
	function updateItemOffset(x: number, y: number) {
		const gridWrapper: HTMLElement | null = document.querySelector(
			`#gridWrapper${gridStore.sectionIndex}`
		);

		const blockOffsetLeft = gridItem.value?.offsetLeft || 0;
		const blockOffsetTop = gridItem.value?.offsetTop || 0;
		const wrapperOffsetLeft = gridWrapper?.getBoundingClientRect().left || 0;
		const wrapperOffsetTop = gridWrapper?.getBoundingClientRect().top || 0;

		offset.value.x = x - wrapperOffsetLeft - blockOffsetLeft;
		offset.value.y = y - wrapperOffsetTop - blockOffsetTop;
	}

	function resetItemOffset() {
		offset.value.x = 0;
		offset.value.y = 0;
	}

	/** Composables */
	useDraggable(gridItem, {
		handle: dragHandle,
		onStart: () => {
			isFocused.value = false;
			isDragging.value = true;
			onStart && onStart();
		},
		onMove: ({ x, y }) => {
			updateItemOffset(x, y);
			onMove && onMove(x, y);
		},
		onEnd: () => {
			isDragging.value = false;
			isFocused.value = true;
			resetItemOffset();
			onEnd && onEnd();
		},
	});

	onClickOutside(gridItem, () => (isFocused.value = false));

	return { offset, isFocused, isDragging };
}
