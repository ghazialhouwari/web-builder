<script lang="ts" setup>
	import { useSectionsStore } from '@/store/sections';
	import { useGridStore } from '@/store/grid';
	import { useAppStore } from '@/store/app';
	// Components
	import PageSections from '@/components/PageSections.vue';
	import Blocks from '@/components/Blocks.vue';
	// Store definition
	const sectionsStore = useSectionsStore();
	const gridStore = useGridStore();
	const appStore = useAppStore();
</script>

<template>
	<v-app>
		<v-app-bar :elevation="2" density="compact">
			<template v-slot:prepend>
				<v-btn
					icon="mdi-arrow-u-left-top"
					color="high-emphasis"
					:disabled="!sectionsStore.undosLength"
					@click="sectionsStore.undo"
				></v-btn>
				<v-btn
					icon="mdi-arrow-u-right-top"
					color="high-emphasis"
					:disabled="!sectionsStore.redosLength"
					@click="sectionsStore.redo"
				></v-btn>
			</template>
			<template v-slot:append>
				<v-btn
					icon="mdi-monitor"
					:color="gridStore.viewType === 'desktop' ? 'primary' : 'medium-emphasis'"
					@click="gridStore.setViewType('desktop')"
				></v-btn>
				<v-btn
					icon="mdi-cellphone"
					:color="gridStore.viewType === 'mobile' ? 'primary' : 'medium-emphasis'"
					@click="gridStore.setViewType('mobile')"
				></v-btn>
			</template>
		</v-app-bar>
		<v-main class="site-main relative">
			<div
				v-if="gridStore.viewType === 'mobile'"
				class="site-mobile__elevation"
			></div>
			<PageSections />
		</v-main>
		<Teleport to="#blocks-menu">
			<Transition name="top-down">
				<Blocks v-if="appStore.isBlockMenuVisible" />
			</Transition>
		</Teleport>
	</v-app>
</template>

<style scoped>
	.site-mobile__elevation {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100vh;
		width: var(--site-mobile-width);
		margin: 0 auto;
		z-index: 10;
	}
</style>
