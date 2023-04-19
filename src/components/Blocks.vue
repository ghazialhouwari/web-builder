<template>
	<v-container>
		<v-card min-width="340" max-width="390" class="overflow-visible">
			<v-card-text class="block__group">
				<h3 class="font-weight-bold text-subtitle-2 px-4">Basic</h3>
				<ul class="block__group-content py-2">
					<Block v-for="(block, i) in blocks" :key="i" :block="block" />
				</ul>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { IBlock } from '@/utils/types';
	import Block from '@/components/Block.vue';

	const blocks = ref<IBlock[]>([
		{
			title: 'Text',
			value: 'text',
			icon: 'mdi-format-text',
			columnSize: 6,
			rowSize: 2,
		},
		{
			title: 'Image',
			value: 'image',
			icon: 'mdi-image-outline',
			columnSize: 6,
			rowSize: 6,
		},
		{
			title: 'Video',
			value: 'video',
			icon: 'mdi-video-outline',
			columnSize: 6,
			rowSize: 6,
		},
	]);
</script>

<style scoped>
	.block__group-content {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		list-style: none;
	}
</style>
