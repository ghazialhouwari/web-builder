<script setup lang="ts">
	import { SectionBlockLayout } from '@/utils/types';
	import { computed } from 'vue';
	// Store
	import { useGridStore } from '@/store/grid';
	// Props
	const props = defineProps<{
		blockLayout: SectionBlockLayout;
	}>();
	const gridStore = useGridStore();
	const gridArea = computed(
		() =>
			`${props.blockLayout.start.y}/${props.blockLayout.start.x}/${props.blockLayout.end.y}/${props.blockLayout.end.x}`
	);
	const errorClasses = computed(() =>
		gridStore.draggedBlockEdgeError.map((dir) => `border-${dir}-error`)
	);
</script>

<template>
	<div class="grid__dragged-block-area" :class="errorClasses"></div>
</template>

<style scoped>
	.grid__dragged-block-area {
		border: var(--site-engine-border-width) solid var(--site-engine-color);
		inset: -3px;
		z-index: 1006;
		grid-area: v-bind(gridArea);
	}
	.border-top-error {
		border-top-color: rgb(var(--v-theme-error));
	}
	.border-right-error {
		border-right-color: rgb(var(--v-theme-error));
	}
	.border-bottom-error {
		border-bottom-color: rgb(var(--v-theme-error));
	}
	.border-left-error {
		border-left-color: rgb(var(--v-theme-error));
	}
</style>
