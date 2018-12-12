<template>
  <div id="app">
    <header>
      <sui-header color="blue" size="huge">Turtle-Draw ISEN</sui-header>
      <sui-header>Matthieu SIMON - Corentin DUVAL</sui-header>
      <sui-divider horizontal></sui-divider>
    </header>

    <sui-grid celled>
      <sui-grid-row>
        <sui-grid-column :width="5"> 
          <sui-header color="blue" size="big"> Editeur </sui-header>
          <sui-divider horizontal></sui-divider>
          <editor v-model="editor_content" height="450" @init="editorInit" theme="textmate"></editor> 
          </sui-grid-column>
        <sui-grid-column :width="3"> <var_table :variables="variables" :turtle_variables="turtle_variables"></var_table> </sui-grid-column>
        <sui-grid-column :width="3"> <utilitary></utilitary> </sui-grid-column>
        <sui-grid-column :width="5"> <keep-alive> <options_compilator :is_compiling="is_compiling" :compilation_successful="compilation_successful" v-on:compile="onCompile" v-on:download="onDownload"></options_compilator> </keep-alive> </sui-grid-column>
      </sui-grid-row>

      <sui-grid-row>
        <sui-grid-column :width="1"></sui-grid-column>
        <sui-grid-column :width="14">
          <rendered_image :machine_code="machine_code" :compile_options="compile_options"></rendered_image>
        </sui-grid-column>
        <sui-grid-column :width="1"></sui-grid-column>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column :width="4"></sui-grid-column>
        <sui-grid-column :width="8">
          <docs_table></docs_table>
        </sui-grid-column>
        <sui-grid-column :width="4"></sui-grid-column>
      </sui-grid-row>
    </sui-grid>
    
  </div>
</template>

<script>
import utilitary from './components/utilitary'
import var_table from './components/var_table'
import rendered_image from './components/rendered_image'
import docs_table from './components/docs_table'
import options_compilator from './components/options_compilator'

export default {
  name: 'App',
  data: function () {
    return{
      editor_content: "",
      is_compiling: false,
      compilation_successful : false,
      variables: [],
      turtle_variables: {x:0, y:0, angle:0},
      error_message: "",
      machine_code: [],
      compile_options: []
    }
  },
  components: {
    var_table,
    rendered_image,
    docs_table,
    options_compilator,
    utilitary,
    editor: require('vue2-ace-editor')
  },
  methods: {
        editorInit: function (editor) {
            require('brace/ext/language_tools') //language extension prerequsite..
            require('brace/theme/textmate')

            editor.setOptions({
              fontSize: "14px",
              showPrintMargin: false
            });
        },
        onCompile: function(compile_options) {
          this.is_compiling = true;
          this.$http.post('http://localhost:5000/compile', {
            "code" : this.editor_content
          }).then(function (response) {
<<<<<<< HEAD
            console.log(response.body)
=======
            console.log(response.body);
>>>>>>> 8b4d962ef9ce8ab2e68b306d7448a23f01afbdf8
            this.is_compiling = false;
            if(response.body.error){
              this.compilation_successful = false;
            } else {
              this.compilation_successful = true;
              this.variables = response.body.variables;
              this.turtle_variables = response.body.turtle_pos;
              this.compile_options = compile_options;
            }
            this.machine_code = response.body;
          });
        }
  }
}
</script>

<style scoped>
header {
  text-align: center;
  padding-top: 1%;
}

h1 {
  margin-top: 1%;
}
sui-header {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}

</style>

