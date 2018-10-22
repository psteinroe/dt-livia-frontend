<template>
	<h1>{{catName}}</h1>
</template>

<script>
export default {
    name: 'Articles',
    data () {
        return {
            catName: ''
        }
    },
    created () {
        this.catName = this.$route.params.catName
        console.log('catName = ' + this.catName)
    }
}
</script>

<style>

</style>