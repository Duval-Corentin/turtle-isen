<template>
    <div class="utilitary">
        <sui-header color='blue' size='big'> Utilitaires </sui-header>
        <sui-divider horizontal>Color Picker</sui-divider>
        <div class='color-picker'>
            <color-picker v-model="colors" />
        </div>
        <sui-divider></sui-divider>
        <sui-button v-on:click="goto('docs-table')" color='blue' size='big' content='Documentation' />
    </div>    
</template>

<script>
import { Sketch } from 'vue-color'

export default {
    name: "utilitary",
    props: [],
    data: function () {
        return {
            colors: '#154522'
        }
    },
    components: {
        'color-picker': Sketch
    }
}
</script>

<style scoped>
.color-picker {
    height: 352px;
}
</style>