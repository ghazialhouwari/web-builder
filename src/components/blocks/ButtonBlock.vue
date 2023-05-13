<script setup lang="ts">
	import { SectionBlockButton } from '@/utils/types';
	// Props
	defineProps<{
		value: SectionBlockButton;
	}>();
</script>

<template>
	<div
		class="button__container d-flex"
		:class="`align-${value.verticalAlignment} justify-${value.horizontalAlignment}`"
	>
		<v-btn color="error" :size="value.buttonSize" :block="value.fluid">{{
			value.buttonText
		}}</v-btn>
	</div>
</template>

<style scoped>
	.button__container {
		width: 100%;
		height: 100%;
	}
</style>
