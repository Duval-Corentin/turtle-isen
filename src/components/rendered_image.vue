<template>
    <div class="rendered-image-div">
        <sui-header color='blue' size='big'> Résultat </sui-header>
        <sui-message id="error-message" :error="true" v-if="Boolean(machine_code.error)">
            <h2>La compilation a échoué</h2>
            <p>Erreur de syntaxe à la ligne {{machine_code.error.hash.line + 1}}</p>
        </sui-message>
        <div id="canvas" v-show="!Boolean(machine_code.error)">
        </div>
    </div>
</template>



<script>

export default {
    name: "rendered_image",
    props: ['machine_code', 'compile_options'],
    data : function () {
        return {
            error_message: ""
        }
    },
    watch: {
        machine_code: function(new_val, old_val) {
            console.log(this.machine_code);
            if(this.draw){
                    this.draw.clear();
                }
            if(this.machine_code.instructions){
                this.draw = new this.$SVGgenerator('canvas', this.compile_options.image_width, this.compile_options.image_height, this.machine_code.instructions, this.compile_options.compilation_type, this.compile_options.between_frame_delay, this.compile_options.turtle_display);
                this.draw.generateCode();
            }
        }
    }
}
</script>

<style>
#canvas {
    max-height: 800;
    overflow: scroll;
    margin-left: 50px;
    width:80%;
}
#error-message {
    width: 50%;
}
.rendered-image-div {
    text-align: center;
}
</style>