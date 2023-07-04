<script setup lang="ts">
	defineProps<{ title: string }>();
</script>

<template>
	<div>
		<h3
			class="site__subtitle font-weight-bold text-grey-darken-1 text-uppercase"
			v-bind="$attrs"
		>
			{{ title }}
		</h3>
	</div>
</template>

<style scoped>
	.site__subtitle {
		font-size: 11px;
	}
</style>
