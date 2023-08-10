<script setup lang='ts'>
const items = ["File", "Edit", "View", "Account", "Theme"]
</script>

<template>
    <div class="flex flex-row gap-2 whitespace-nowrap rounded-md px-2 py-1 shadow">
        <span v-for="item in items" :key="item">{{ item }}</span>
    </div>
</template>
