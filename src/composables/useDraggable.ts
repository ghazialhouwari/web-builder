import { onMounted, Ref, ref } from 'vue';
import { useDraggable as useVueCoreDraggable } from '@vueuse/core';

export default function useDraggable(
	gridItem: Ref<HTMLElement | null>,
	onMove: (x: number, y: number) => void,
	onEnd: () => void
) {
	const offset = ref({ x: 0, y: 0 });
	const gridWrapper = ref<HTMLElement | null>(null);

	function updateItemOffset(x: number, y: number) {
		const wrapperOffsetTop = gridWrapper.value?.offsetTop || 0;
		offset.value.x = x - (gridItem.value?.offsetLeft || 0);
		offset.value.y = y - wrapperOffsetTop - (gridItem.value?.offsetTop || 0);
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

	onMounted(() => {
		gridWrapper.value = document.querySelector('#gridWrapper');
	});

	return { offset };
}
