<script lang="ts" setup>
	import { useSectionsStore } from '@/store/sections';

	// Components
	import PageSections from '@/components/PageSections.vue';

	const sectionsStore = useSectionsStore();
</script>

<template>
	<v-app>
		<v-app-bar :elevation="2" density="compact">
			<template v-slot:append>
				<v-btn
					icon="mdi-undo"
					color="medium-emphasis"
					@click="sectionsStore.undo"
				></v-btn>
				<v-btn
					icon="mdi-redo"
					color="medium-emphasis"
					@click="sectionsStore.redo"
				></v-btn>
			</template>
		</v-app-bar>
		<v-main>
			<PageSections />
		</v-main>
	</v-app>
</template>
