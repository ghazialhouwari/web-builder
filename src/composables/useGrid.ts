import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
import { useGridStore } from '@/store/grid';

export default function useGrid() {
	const gridStore = useGridStore();
	const gridWrapper = ref<HTMLElement | null>(null);

	const rowCount = computed(() => {
		const sectionRowCount = gridStore.sectionLayout?.rows ?? 1;
		const draggableBlockRowCount = gridStore.draggedBlockLayout?.end.y ?? 1;
		return (
			Math.max(gridStore.minRowCount, sectionRowCount, draggableBlockRowCount) - 1
		);
	});

	function handleResize() {
		if (gridStore.viewType === 'desktop' && window.innerWidth <= 767) {
			gridStore.setViewType('mobile');
		} else if (gridStore.viewType === 'mobile' && window.innerWidth > 767) {
			gridStore.setViewType('desktop');
		}
	}

	function setGridWrapper() {
		gridWrapper.value = document.querySelector(
			`#gridWrapper${gridStore.sectionIndex}`
		);
	}

	onMounted(() => {
		setGridWrapper();
		window.addEventListener('resize', handleResize);
	});
	onUnmounted(() => window.removeEventListener('resize', handleResize));

	return {
		rowCount,
		gridWrapper,
	};
}
