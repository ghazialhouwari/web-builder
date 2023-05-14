<script setup lang="ts">
	import { SectionBlockLayout } from '@/utils/types';
	import { computed } from 'vue';
	// Props
	const props = defineProps<{
		blockLayout: SectionBlockLayout;
	}>();

	const gridArea = computed(
		() =>
			`${props.blockLayout.start.y}/${props.blockLayout.start.x}/${props.blockLayout.end.y}/${props.blockLayout.end.x}`
	);
</script>

<template>
	<div class="grid__dragged-block-area"></div>
</template>

<style scoped>
	.grid__dragged-block-area {
		border: var(--site-engine-border-width) solid var(--site-engine-color);
		inset: -3px;
		z-index: 10;
		grid-area: v-bind(gridArea);
	}
</style>
