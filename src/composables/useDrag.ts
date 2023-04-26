import { onBeforeUnmount, onMounted, Ref } from 'vue';

export default function useDrag(
	element: Ref<HTMLElement | null>,
	onMouseDown: (evt: MouseEvent) => void,
	onMouseMove: (evt: MouseEvent) => void,
	onMouseUp: () => void
) {
	onMounted(() => {
		element.value?.addEventListener('mousedown', onMouseDown);
	});

	onBeforeUnmount(() => {
		element.value?.removeEventListener('mousedown', onMouseDown);
	});

	function attachMouseListeners() {
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	function removeMouseListeners() {
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
	}

	return { attachMouseListeners, removeMouseListeners };
}
