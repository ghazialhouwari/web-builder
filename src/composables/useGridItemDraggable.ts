import { ref, Ref } from 'vue';
import { useDraggable } from '@vueuse/core';
import useGrid from '@/composables/useGrid';

export default function useGridItemDraggable({
	gridItem,
	onStart,
	onMove,
	onEnd,
}: {
	gridItem: Ref<HTMLElement | null>;
	onStart?: () => void;
	onMove?: (x: number, y: number) => void;
	onEnd?: () => void;
}) {
	const offset = ref({ x: 0, y: 0 });
	const { gridWrapper } = useGrid();

	function updateItemOffset(x: number, y: number) {
		const wrapperOffsetTop = gridWrapper.value?.offsetTop || 0;
		offset.value.x = x + window.scrollX - (gridItem.value?.offsetLeft || 0);
		offset.value.y =
			y + window.scrollY - wrapperOffsetTop - (gridItem.value?.offsetTop || 0);
	}

	function resetItemOffset() {
		offset.value.x = 0;
		offset.value.y = 0;
	}

	useDraggable(gridItem, {
		onStart: () => {
			onStart && onStart();
		},
		onMove: ({ x, y }) => {
			updateItemOffset(x, y);
			onMove && onMove(x, y);
		},
		onEnd: () => {
			resetItemOffset();
			onEnd && onEnd();
		},
	});

	return { offset };
}
