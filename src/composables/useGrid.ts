import { ref, onMounted, onUnmounted } from 'vue';
import { useGridStore } from '@/store/grid';

export default function useGrid() {
	const gridStore = useGridStore();
	const gridWrapper = ref<HTMLElement | null>(null);

	function handleResize() {
		if (gridStore.viewType === 'desktop' && window.innerWidth <= 767) {
			gridStore.setViewType('mobile');
		} else if (gridStore.viewType === 'mobile' && window.innerWidth > 767) {
			gridStore.setViewType('desktop');
		} else {
			gridStore.updateGrid();
		}
	}

	function setGridWrapper() {
		gridWrapper.value = document.querySelector(
			`#gridWrapper${gridStore.activeSectionIndex}`
		);
	}

	onMounted(() => {
		setGridWrapper();
		window.addEventListener('resize', handleResize);
	});
	onUnmounted(() => window.removeEventListener('resize', handleResize));
}
