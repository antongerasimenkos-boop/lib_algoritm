<template>
    <div id="favorites-view">
        <FavoritesBoard />
    </div>
</template>

<script>
import FavoritesBoard from '@/components/FavoritesBoard.vue'

export default {
    name: 'Favorites',
    components: {
        FavoritesBoard
    }
}
</script>
