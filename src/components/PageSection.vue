<script setup lang="ts">
	import Grid from '@/components/Grid.vue';
	import { Section } from '@/utils/types';

	interface Props {
		section: Section;
		sectionIndex: number;
	}

	defineProps<Props>();
</script>
<template>
	<div class="site-section">
		<div class="py-12">
			<Grid :section="section" :sectionIndex="sectionIndex" />
		</div>
	</div>
</template>
