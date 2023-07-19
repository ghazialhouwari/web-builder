import { onBeforeUnmount, onMounted, Ref } from 'vue';

export default function useDrag(
	element: Ref<HTMLElement | null> | string[],
	onMouseDown: (evt: MouseEvent) => void,
	onMouseMove: (evt: MouseEvent) => void,
	onMouseUp: () => void
) {
	const elements: Array<HTMLElement | null> = [];

	onMounted(() => {
		if (element instanceof Array) {
			element.forEach((selector) => {
				const el: HTMLElement | null = document.querySelector(selector);
				if (el) {
					el.addEventListener('mousedown', onMouseDown);
					elements.push(el);
				}
			});
		} else {
			element.value?.addEventListener('mousedown', onMouseDown);
		}
	});

	onBeforeUnmount(() => {
		if (element instanceof Array) {
			elements?.forEach((el) => {
				el?.removeEventListener('mousedown', onMouseDown);
			});
		} else {
			element.value?.removeEventListener('mousedown', onMouseDown);
		}
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
