<script lang="ts" setup>
	import { useSectionsStore } from '@/store/sections';
	import { useGridStore } from '@/store/grid';

	// Components
	import PageSections from '@/components/PageSections.vue';

	const sectionsStore = useSectionsStore();
	const gridStore = useGridStore();
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
		<v-main class="site__main" :class="gridStore.viewType">
			<PageSections />
		</v-main>
	</v-app>
</template>

<style scoped>
	.site__main.mobile {
		width: 430px;
		margin: 0 auto;
	}
</style>
