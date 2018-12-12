<template>
    <div id="options_compilator">
        <sui-header color="blue" size="big">Options</sui-header>
        <sui-divider horizontal> Taille de l'image </sui-divider>
        <div>
            <sui-label :color='(image_width <= minimum_width) ? "red" : "blue"'>
                Largeur
                <sui-input type="number" v-model="image_width" :error="image_width <= minimum_width" :placeholder="image_width"/>
                px
            </sui-label>
            <a is="sui-label" :color='(image_height <= minimum_height) ? "red" : "blue"'>
                Hauteur
                <sui-input type="number" v-model="image_height" :placeholder="image_height"/>
                px
            </a>
            <sui-message :error="true" v-show="image_height <= minimum_height || image_width <= minimum_width">
                <p> la taille minimal de l'image doit être de {{minimum_width}} x {{minimum_height}} pixels</p>
            </sui-message>

        </div>
        <sui-divider horizontal> Options de compilation </sui-divider>
        <sui-menu tabular>
            <a
                is="sui-menu-item"
                v-for="item in compilation_type"
                :key="item"
                :active="isActive(item)"
                :content="item"
                @click.prevent="select(item)"
            />
        </sui-menu>
        <div id="static_options" class="option_div" v-show="isActive(compilation_type[0])">
            Compile le programme sous forme d'un canevas. Chaque instruction créée une nouvelle couche sur le canevas.
        </div>
        <div id="animated_options" class="option_div" v-show="isActive(compilation_type[1])">
        <p>Compile le programme sous forme d'une animation.</p>
            <sui-form id="animated_options_form">
                <sui-form-field>
                    <sui-checkbox toggle v-model="turtle_display" label="Affichage de la tortue"/>
                </sui-form-field>
                <sui-form-field>
                    <a is="sui-label" :color='(between_frame_delay <= min_frame_delay || between_frame_delay >= max_frame_delay) ? "red" : "blue"'>
                        Délai entre chaque frame (ms)
                        <sui-input type="number" v-model="between_frame_delay" :placeholder="between_frame_delay"/> 
                    </a>
                </sui-form-field>
            </sui-form>
            <sui-message :error="true" v-show="between_frame_delay <= min_frame_delay || between_frame_delay >= max_frame_delay">
                <p> le delai doit être compris entre {{min_frame_delay}} ms et {{max_frame_delay}} ms.</p>
            </sui-message>
        </div>
        <sui-divider horizontal> Compilation </sui-divider>
        <sui-button size="big" color="blue" content="Lancer" :loading="is_compiling" v-on:click="$emit('compile', getCompileOptions())"/>
    </div>
</template>

<script>
export default {
    name: "options_compilator",
    props : ['is_compiling', 'compilation_successful'],
    data: function () {
        return {
            compilation_type: ['Statique', 'Animé'],
            active_compilation_type: 'Statique',
            image_width: 1000,
            image_height: 800,
            minimum_width: 50,
            minimum_height: 50,
            turtle_display: true,
            between_frame_delay: 600,
            min_frame_delay: 10,
            max_frame_delay: 3000
        }
    },
    methods: {
        isActive(name) {
            return this.active_compilation_type === name;
        },
        select(name) {
            this.active_compilation_type = name;
        },
        getCompileOptions(){
            return {
                compilation_type: this.active_compilation_type,
                turtle_display: this.turtle_display,
                between_frame_delay: this.between_frame_delay,
                image_width: this.image_width,
                image_height: this.image_height
            }
        }
    }
}
</script>

<style>
#animated_options_form {
    width:200px;
    margin-bottom: 2%;
}
.option_div {
    height: 200px;
}
</style>
