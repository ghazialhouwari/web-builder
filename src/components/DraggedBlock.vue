<script setup lang="ts">
	import { SectionBlockLayout } from '@/utils/types';
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
		border: 2px solid rgb(2, 122, 255);
		inset: -2px;
		border-style: solid;
		border-width: 2px;
		border-color: rgb(2, 122, 255);
		box-sizing: border-box;
		z-index: 10;
	}
</style>
