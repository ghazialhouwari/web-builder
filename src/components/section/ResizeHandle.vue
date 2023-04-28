<script setup lang="ts">
	import { ref, toRefs } from 'vue';
	import { Section } from '@/utils/types';
	// Composables
	import useSectionResize from '@/composables/useSectionResize';
	// Props
	const props = defineProps<{
		section: Section;
		sectionIndex: number;
		rowCount: number;
		highestBlockEndY: number | null;
	}>();

	const { rowCount, highestBlockEndY } = toRefs(props);

	const resizeHandle = ref<HTMLElement | null>(null);
	// Use composables
	useSectionResize({
		section: props.section,
		sectionIndex: props.sectionIndex,
		rowCount,
		highestBlockEndY,
		resizeHandle,
	});
</script>

<template>
	<div ref="resizeHandle" class="section__resize-handle">
		<v-btn
			class="section__resize-handle-btn"
			color="primary"
			icon="mdi-arrow-split-horizontal"
		></v-btn>
	</div>
</template>

<style scoped>
	.section__resize-handle {
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
	.section__resize-handle-btn {
		cursor: row-resize;
	}
</style>
