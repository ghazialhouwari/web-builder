<script setup lang="ts">
	import { ref } from 'vue';
	import { SiteBlock } from '@/utils/types';
	import { blocks as data } from '@/data/blocks';

	// Components
	import Block from '@/components/Block.vue';

	const blocks = ref<SiteBlock[]>(data);
</script>

<template>
	<v-card min-width="340" max-width="390" class="blocks__card overflow-visible">
		<v-card-text class="block__group">
			<h3 class="font-weight-bold text-subtitle-2 px-4">Basic</h3>
			<ul class="block__group-content py-2">
				<Block v-for="(block, i) in blocks" :key="i" :block="block">
					<v-icon size="22" class="me-2">{{ block.icon }}</v-icon>
					<h4>{{ block.type }}</h4>
				</Block>
			</ul>
		</v-card-text>
	</v-card>
</template>

<style scoped>
	.blocks__card {
		position: sticky;
		top: 20px;
		left: 20px;
		z-index: 999;
	}
	.block__group-content {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		list-style: none;
	}
</style>
