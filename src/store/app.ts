import { Position } from '@/utils/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
	const isBlockMenuVisible = ref(false);
	const blocksMenuPosition = ref<Position>({ x: 0, y: 0 });

	function showBlocksMenu(position: Position) {
		blocksMenuPosition.value = position;
		isBlockMenuVisible.value = true;
	}
	function closeBlocksMenu() {
		isBlockMenuVisible.value = false;
	}

	return {
		isBlockMenuVisible,
		blocksMenuPosition,
		showBlocksMenu,
		closeBlocksMenu,
	};
});
