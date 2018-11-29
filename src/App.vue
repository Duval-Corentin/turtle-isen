<template>
  <div id="app">
    <header>
      <sui-header color="blue" size="huge">Turtle-Draw ISEN</sui-header>
      <sui-header>Matthieu SIMON - Corentin DUVAL</sui-header>
      <sui-divider horizontal></sui-divider>

      <sui-grid collums="30" celled="internally">
        <sui-grid-column :width="6"> 
          <sui-header color="blue" size="big"> Editeur </sui-header>
          <editor v-model="content" lang="javascript" height="500" @init="editorInit" theme="monokai"></editor> 
          </sui-grid-column>
        <sui-grid-column :width="4"> <docs_table></docs_table> </sui-grid-column>
        <sui-grid-column :width="6"> <options_compilator :is_compiling="is_compiling"></options_compilator> </sui-grid-column>
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
      is_compiling: true
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
        editorInit: function () {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/javascript')    //language
            require('brace/theme/monokai')
            require('brace/snippets/javascript') //snippet
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

