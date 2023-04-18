import { Ref, ref } from 'vue';
import { useDraggable as useVueCoreDraggable } from '@vueuse/core';

export default function useDraggable(
	gridItem: Ref<HTMLElement | null>,
	onMove: (x: number, y: number) => void,
	onEnd: () => void
) {
	const offset = ref({ x: 0, y: 0 });

	function updateItemOffset(x: number, y: number) {
		offset.value.x = x - (gridItem.value?.offsetLeft || 0);
		offset.value.y = y - (gridItem.value?.offsetTop || 0);
	}

	function resetItemOffset() {
		offset.value.x = 0;
		offset.value.y = 0;
	}

	useVueCoreDraggable(gridItem, {
		onMove: ({ x, y }) => {
			onMove(x, y);
			updateItemOffset(x, y);
		},
		onEnd: () => {
			onEnd();
			resetItemOffset();
		},
	});

	return { offset };
}
