<script setup lang="ts">
	import { Section } from '@/utils/types';
	// Components
	import Grid from '@/components/Grid.vue';
	// Emits
	/* eslint-disable no-unused-vars */
	const emits = defineEmits({
		mouseOver: (sectionIndex: number) => true,
	});
	// Props
	defineProps<{
		section: Section;
		sectionIndex: number;
	}>();
</script>

<template>
	<div class="site__section" @mouseover="emits('mouseOver', sectionIndex)">
		<div class="py-12">
			<Grid :section="section" :sectionIndex="sectionIndex" />
		</div>
	</div>
</template>

<style scoped>
	.site__section:hover {
		box-shadow: inset 0 0 0 var(--site-engine-border-width)
			var(--site-engine-color);
	}
</style>
