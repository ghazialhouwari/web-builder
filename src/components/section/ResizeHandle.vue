<script setup lang="ts">
	import { inject, Ref, ref } from 'vue';
	// Composables
	import useSectionResize from '@/composables/useSectionResize';

	const rowCount = inject<Ref<number>>('rowCount', ref(0));
	const resizeHandle = ref<HTMLElement | null>(null);
	// Use composables
	useSectionResize({
		rowCount,
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
