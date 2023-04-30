<script lang="ts" setup>
	// Components
	import PageSections from '@/components/PageSections.vue';
	import AppBar from '@/components/app/Bar.vue';
</script>

<template>
	<v-app>
		<AppBar />
		<v-main class="site-main relative">
			<PageSections />
		</v-main>
	</v-app>
</template>
