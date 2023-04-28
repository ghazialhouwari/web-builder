import { Ref, ref, onMounted, onUnmounted } from 'vue';

type ResizeCallback = (width: number, height: number) => void;

export function useWindowSize(callback?: ResizeCallback): {
	width: Ref<number>;
	height: Ref<number>;
} {
	const width: Ref<number> = ref(window.innerWidth);
	const height: Ref<number> = ref(window.innerHeight);

	const handleResize = () => {
		width.value = window.innerWidth;
		height.value = window.innerHeight;

		callback?.(width.value, height.value);
	};

	onMounted(() => {
		window.addEventListener('resize', handleResize);
	});

	onUnmounted(() => {
		window.removeEventListener('resize', handleResize);
	});

	return { width, height };
}
