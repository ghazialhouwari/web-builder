<script lang="ts" setup>
	// Store
	import { useAppStore } from '@/store/app';
	// Components
	import PageSections from '@/components/PageSections.vue';
	import Blocks from '@/components/Blocks.vue';
	import AppBar from '@/components/app/Bar.vue';
	// Store definition
	const appStore = useAppStore();
</script>

<template>
	<v-app>
		<AppBar />
		<v-main class="site-main relative">
			<PageSections />
		</v-main>
		<Teleport to="#blocks-menu">
			<Transition name="top-down">
				<Blocks v-if="appStore.isBlockMenuVisible" />
			</Transition>
		</Teleport>
	</v-app>
</template>
