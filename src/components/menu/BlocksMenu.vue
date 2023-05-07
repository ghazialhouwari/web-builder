<script setup lang="ts">
	import { ref } from 'vue';
	import { SiteBlock } from '@/utils/types';
	import { blocks as data } from '@/data/blocks';
	// // Components
	import SectionBlocksMenuItem from '@/components/menu/BlocksMenuItem.vue';

	const blocks = ref<SiteBlock[]>(data);
	const isDraggingBlock = ref(false);
	const isMenuVisible = ref(false);

	function dragEndHandler() {
		isDraggingBlock.value = false;
		isMenuVisible.value = false;
	}
</script>

<template>
	<div :class="{ 'block--is-dragging': isDraggingBlock }">
		<v-menu
			v-model="isMenuVisible"
			:close-on-content-click="false"
			transition="slide-y-transition"
		>
			<template v-slot:activator="{ props }">
				<v-btn
					v-bind="props"
					prependIcon="mdi-plus"
					color="white"
					class="block__menu-trigger"
					>Add Block</v-btn
				>
			</template>
			<v-card
				min-width="340"
				max-width="390"
				class="overflow-visible"
				:class="{ 'block--is-dragging': isDraggingBlock }"
			>
				<v-card-text class="block__group">
					<h3 class="font-weight-bold text-subtitle-2 px-4">Basic</h3>
					<ul class="block__group-content py-2">
						<SectionBlocksMenuItem
							v-for="(block, i) in blocks"
							:key="i"
							:block="block"
							@start="isDraggingBlock = true"
							@end="dragEndHandler"
						>
							<v-icon size="22" class="me-2">{{ block.icon }}</v-icon>
							<h4>{{ block.type }}</h4>
						</SectionBlocksMenuItem>
					</ul>
				</v-card-text>
			</v-card>
		</v-menu>
	</div>
</template>

<style scoped>
	.block__menu-trigger {
		position: absolute;
		top: 20px;
		left: 20px;
	}
	.block__group-content {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		list-style: none;
	}
	.block--is-dragging {
		opacity: 0;
	}
</style>
