<template>
    <div id="options_compilator">
        <sui-header color="blue" size="big">Options</sui-header>
        <sui-divider horizontal> Taille de l'image </sui-divider>
        <div>
            <a is="sui-label">
                Largeur
                <sui-input type="number" value="image_width" />
            </a>
            <a is="sui-label">
                Hauteur
                <sui-input type="number" value="image_height"/>
            </a>
        </div>
        <sui-menu tabular>
            <a
                is="sui-menu-item"
                v-for="item in compilation_type"
                :key="item"
                :active="isActive(item)"
                :content="item"
                @click="select(item)"
            />
        </sui-menu>
        <div id="static_options" v-if="isActive(compilation_type[0])">
            in statique
        </div>
        <div id="animated_options" v-if="isActive(compilation_type[1])">
            in animated
        </div>

        <sui-button size="big" color="blue" content="Compilation" :loading="is_compiling" />
    </div>
</template>

<script>
export default {
    name: "options_compilator",
    props : ['is_compiling'],
    data: function () {
        return {
            compilation_type: ['Statique', 'Animé'],
            active_compilation_type: 'Statique',
            image_width: 1000,
            image_height: 800
        }
    },
    methods: {
        isActive(name) {
            return this.active_compilation_type === name;
        },
        select(name) {
            this.active_compilation_type = name;
        },
    }
}
</script>

<style scoped>

</style>
