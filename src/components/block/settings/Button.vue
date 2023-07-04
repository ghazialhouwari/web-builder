<script setup lang="ts">
	import { ButtonSectionBlock } from '@/utils/types';
	import MainSettings from '@/components/block/settings/button/MainSettings.vue';
	import { ref } from 'vue';

	// Props
	defineProps<{
		block: ButtonSectionBlock;
		blockIndex: number;
	}>();

	const subMenu = ref<string | null>(null);

	// function openSubMenu(value: string) {
	// 	subMenu.value = value;
	// }
	// function closeSubMenu() {
	// 	subMenu.value = null;
	// }
</script>

<template>
	<div class="position-relative">
		<Transition name="slide_primary" mode="in-out">
			<div v-show="!subMenu" class="palette__container">
				<MainSettings :block="block" :blockIndex="blockIndex" />
			</div>
		</Transition>

		<!-- <v-divider class="my-4"></v-divider>
		<v-btn
			variant="tonal"
			color="primary"
			prepend-icon="mdi-water-opacity"
			block
			@click="openSubMenu('CUSTOM_DESIGN')"
			>Customize Design</v-btn
		> -->
		<!-- <Transition name="slide_secondary" mode="out-in">
			<div v-if="subMenu === 'CUSTOM_DESIGN'" class="palette__container">
				<CustomDesign
					:block="block"
					:blockIndex="blockIndex"
					@closeSubMenu="closeSubMenu"
				/>
			</div>
		</Transition> -->
	</div>
</template>

<style>
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

	/* Sections Palette Transition */
	.slide_primary-enter-from,
	.slide_primary-enter-to,
	.slide_primary-leave-from,
	.slide_secondary-enter-from,
	.slide_secondary-enter-to,
	.slide_secondary-leave-from,
	.slide_secondary-leave-to {
		position: absolute;
	}

	.slide_primary-enter-active,
	.slide_primary-leave-active,
	.slide_secondary-enter-active,
	.slide_secondary-leave-active {
		transition: all 500ms ease;
	}

	.slide_primary-enter-from,
	.slide_primary-leave-to {
		transform: translateX(-110%);
	}

	/* Compoents Palette Transition */
	.slide_secondary-enter-from,
	.slide_secondary-leave-to {
		transform: translateX(110%);
	}
	.slide_secondary-enter-to,
	.slide_secondary-leave-from,
	.slide_primary-enter-to,
	.slide_primary-leave-from {
		transform: translateX(0%);
	}

	.palette__container {
		width: 100%;
		top: 0;
		left: 0;
	}
</style>
