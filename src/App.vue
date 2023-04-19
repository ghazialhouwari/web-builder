<template>
	<v-app>
		<v-main>
			<Blocks />
			<div class="py-12">
				<Grid />
			</div>
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
	import Grid from '@/components/Grid.vue';
	import Blocks from '@/components/Blocks.vue';
</script>
