<script setup lang="ts">
	// Emits
	const emits = defineEmits({
		showBlocksMenu: () => true,
	});
</script>

<template>
	<div class="block-menu" @click="emits('showBlocksMenu')">
		<v-btn prependIcon="mdi-plus" color="white" class="block-menu__trigger"
			>Add Block</v-btn
		>
	</div>
</template>

<style scoped>
	.block-menu {
		position: absolute;
		top: 20px;
		left: 20px;
	}
</style>
