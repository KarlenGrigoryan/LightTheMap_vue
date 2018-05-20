<template>
  <header class="ms-header ms-header-primary">
    <!--ms-header-primary-->
    <div class="container container-full">
      <div class="ms-title">
        <router-link to="/">
          <span class="ms-logo">L</span>
          <h1>Light The
            <span> Map</span>
          </h1>
        </router-link>
      </div>
      <div class="header-right">
        <div class="ms-footbar-social">
          <a href="https://facebook.com" class="btn-circle btn-facebook">
            <i class="zmdi zmdi-facebook"></i>
          </a>
          <a href="https://www.instagram.com/" class="btn-circle btn-instagram">
            <i class="zmdi zmdi-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
    export default {
        name: "headerPrimary"
    }
</script>
