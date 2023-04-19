<template>
	<v-container>
		<v-card max-width="300" class="overflow-visible">
			<v-list density="compact" class="overflow-visible">
				<v-list-subheader>BLOCKS</v-list-subheader>
				<Block v-for="(item, i) in items" :key="i" :item="item" />
			</v-list>
		</v-card>
	</v-container>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { IBlock } from '@/utils/types';
	import Block from '@/components/Block.vue';

	const items = ref<IBlock[]>([
		{
			title: 'Item #1',
			value: 1,
		},
		{
			title: 'Item #2',
			value: 2,
		},
		{
			title: 'Item #3',
			value: 3,
		},
	]);
</script>
