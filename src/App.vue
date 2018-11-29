<template>
  <div id="app">
    <header>
      <sui-header color="blue" size="huge">Turtle-Draw ISEN</sui-header>
      <sui-header>Matthieu SIMON - Corentin DUVAL</sui-header>
      <sui-divider horizontal></sui-divider>

      <sui-grid collums="30" celled>
        <sui-grid-column :width="6"> 
          <sui-header color="blue" size="big"> Editeur </sui-header>
          <sui-divider horizontal></sui-divider>
          <editor v-model="content" lang="javascript" height="450" @init="editorInit" theme="textmate"></editor> 
          </sui-grid-column>
        <sui-grid-column :width="5"> <var_table :variables="variables"></var_table> </sui-grid-column>
        <sui-grid-column :width="5"> <keep-alive> <options_compilator :is_compiling="is_compiling" :compilation_successful="compilation_successful"></options_compilator> </keep-alive> </sui-grid-column>
      </sui-grid>
    </header>
    
  </div>
</template>

<script>
import var_table from './components/var_table'
import rendered_image from './components/rendered_image'
import docs_table from './components/docs_table'
import options_compilator from './components/options_compilator'

export default {
  name: 'App',
  data: function () {
    return{
      content: "",
      is_compiling: false,
      compilation_successful : false,
      variables: [
        {x:10},
        {y:30},
        {bite: 12.56844564},
        {bite: 12.56844564},
        {bite: 12.56844564},
        {bite: 12.56844564},
        {bite: 12.56844564},
        {bite: 12.56844564},
        {bite: 12.56844564},
        {bite: 12.56844564},
        {bite: 12.56844564},
        {chatte: "j'aime les gros chibres"}
      ]
    }
  },
  components: {
    var_table,
    rendered_image,
    docs_table,
    options_compilator,
    editor: require('vue2-ace-editor')
  },
  methods: {
        editorInit: function (editor) {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/javascript')    //language
            require('brace/theme/textmate')
            require('brace/snippets/javascript') //snippet

            editor.setOptions({
              fontSize: "14px",
              showPrintMargin: false
            })
        }
  }
}
</script>

<style>
header {
  text-align: center;
  padding-top: 1%;
}

h1 {
  margin-top: 1%;
}

</style>

