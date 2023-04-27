<script setup lang="ts">
	import { SectionBlockLayout } from '@/utils/types';
	// Props
	defineProps<{
		blockLayout: SectionBlockLayout;
	}>();
</script>

<template>
	<div
		class="grid-wrapper__dragged-item-area"
		:style="{
			gridArea: `${blockLayout.start.y}/${blockLayout.start.x}/${blockLayout.end.y}/${blockLayout.end.x}`,
		}"
	></div>
</template>

<style scoped>
	.grid-wrapper__dragged-item-area {
		border: var(--site-engine-border-width) solid var(--site-engine-color);
		inset: -3px;
		z-index: 10;
	}
</style>
