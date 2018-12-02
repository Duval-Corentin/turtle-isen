<template>
    <div class="utilitary">
        <sui-header color='blue' size='big'> Utilitaires </sui-header>
        <sui-divider horizontal>Color Picker</sui-divider>
        <div class='color-picker'>
            <color-picker v-model="colors" />
        </div>
        <sui-divider></sui-divider>
        <sui-button v-on:click="goto('docs')" color='blue' size='big' content='Documentation' />
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
    },
     methods : {
        goto(refName) {
            var element = this.$refs[refName];
            console.log(this.$refs);
            var top = element.offsetTop;
            window.scrollTo(0, top);
        }
    }
}
</script>

<style scoped>
.color-picker {
    height: 352px;
}
</style>