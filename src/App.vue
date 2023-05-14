<script lang="ts" setup>
	// Components
	import AppSections from '@/components/app/Sections.vue';
	import AppBar from '@/components/app/Bar.vue';
	// Composables
	import { useWindowSize } from '@/composables/useWindowSize';
	// Store
	import { useGridStore } from '@/store/grid';

	// Store definition
	const gridStore = useGridStore();

	// Use composables
	useWindowSize((width: number) => {
		const { viewType, setViewType, updateGrid } = gridStore;
		if (viewType === 'desktop' && width <= 767) {
			setViewType('mobile');
		} else if (viewType === 'mobile' && width > 767) {
			setViewType('desktop');
		} else {
			updateGrid();
		}
	});
</script>

<template>
	<v-app>
		<AppBar />
		<v-main class="site-main relative">
			<AppSections />
		</v-main>
	</v-app>
</template>
