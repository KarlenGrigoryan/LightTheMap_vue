<template>
  <div id="app">
    <div class="ms-header ms-header-primary">
      <app-header></app-header>
    </div>
    <router-view/>

    <app-footer></app-footer>
    <div class="btn-back-top">
      <a href="#" data-scroll id="back-top" class="btn-circle btn-circle-primary btn-circle-sm btn-circle-raised ">
        <i class="zmdi zmdi-long-arrow-up"></i>
      </a>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header';
  import Footer from './components/Footer';
  export default {
    name: 'App',
    components: {
      'app-header': Header,
      'app-footer': Footer
    }
  }
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*color: #2c3e50;*/
}
</style>
