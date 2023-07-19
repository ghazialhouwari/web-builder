<script setup lang="ts">
	import { ref } from 'vue';
	import { tabs } from '@/data/blockSettingsTabs';
	import { BlockType } from '@/utils/types';

	// Props
	defineProps<{
		blockType: BlockType;
	}>();

	const tab = ref(1);
</script>
<template>
	<div class="position-relative">
		<div class="block-settings__title">
			<v-tabs v-model="tab" color="primary">
				<v-tab
					v-for="(item, tabIndex) of tabs[blockType]"
					:key="blockType + item"
					:value="tabIndex + 1"
					min-width="auto"
					class="px-0 me-4"
					variant="plain"
					:ripple="false"
					>{{ item }}</v-tab
				>
			</v-tabs>
		</div>
		<v-card-text class="block-settings__content pt-0 border-t d-grid">
			<v-window v-model="tab" class="d-grid">
				<v-window-item
					v-for="(item, tabIndex) of tabs[blockType]"
					:key="`${blockType}-${tabIndex}`"
					:value="tabIndex + 1"
					class="pt-4"
				>
					<slot :name="`window${item}`" />
				</v-window-item>
			</v-window>
		</v-card-text>
	</div>
</template>

<style scoped>
	.block-settings__content {
		height: calc(500px - 48px);
		overflow-y: auto;
		overscroll-behavior: contain;
	}
	.block-settings__title {
		width: fit-content;
		margin: 0 16px;
		position: relative;
		z-index: 3;
		height: 48px;
	}
</style>
