<template>
    <div id="portfolio">
        <div class="loader" v-if="loader">
            <svg class="circular">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10" />
            </svg>
        </div>
         <div class="container" v-if="!loader">
        <div class="row">
          <div class="col-lg-12">
            <br>
              <div class="card mb-1">
                  <ul class="listing-filter portfolio">
                      <li v-if="initiative.medias"><img :src="initiative.medias.profle" alt=""></li>
                      <li>
                          <h4 class="filter-title">{{ initiative.name }}</h4>
                          <h6 class="filter-content" v-if="initiative.address">Teach guitar to the local kids in {{ initiative.address.city }}</h6>
                          <span href="#" class="btn btn-raised btn-xs btn-default ops-btn" v-for="(tag, key) in initiative.tags" :key="key">{{ tag.name }}</span>
                      </li>
                      <li class="top"><span class="number-ch"><i class="ion-happy-outline"></i>{{ initiative.students }} Students</span></li>
                  </ul>
              </div>

              <div class="panel-menu " id="collapseMenu-1">

                  <a href="#" class="btn btn-xlg btn-raised btn-primary btn-raised btn-block media-show">
                      <i class="mr-2 fa fa-globe"></i>
                      LOCATE US
                      <div class="col-md-2"></div>
                  </a>

                  <a href="#" class="btn btn-xlg btn-block btn-raised btn-primary btn-success media-show">
                      <i class="fa fa-envelope-o"></i>
                      EMAIL US
                      <div class="ripple-container"></div>
                  </a>

                  <!-- ms-collapse-nav -->
              </div>

          </div>
          <div class="col-lg-8">
            <div class="card">
              <div class="card-body card-body-big">

                <img :src="initiative.medias.big" alt="" class="img-fluid mb-4" v-if="initiative.medias">

                <h1 class="no-mt">About {{ initiative.name }}</h1>

                <p v-html="initiative.about"></p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 media-hide">

            <div class="card">

              <div class="card-body">

                <div class="panel-menu" id="collapseMenu">

                    <a href="#" class="btn btn-xlg btn-raised btn-primary btn-raised btn-block media-show">
                        <i class="mr-2 fa fa-globe"></i>
                        LOCATE US
                        <div class="col-md-2"></div>
                    </a>

                  <a href="#" class="btn btn-xlg btn-block btn-raised btn-primary btn-success">
                    <i class="fa fa-envelope-o"></i>
                    EMAIL US
                    <div class="ripple-container"></div>
                  </a>

                  <ul class="panel-group ms-collapse-nav" id="components-nav" role="tablist" aria-multiselectable="true" v-if="initiative.social_networks">
                    <li>
                      <a class="withripple" :href="initiative.social_networks.website" target="_blank">
                        <i class="mr-2 fa fa-globe"></i> Website</a>
                    </li>
                    <li>
                      <a class="withripple" :href="initiative.social_networks.facebook" target="_blank">
                        <i class="mr-2 fa fa-thumbs-o-up"></i> Facebook Page</a>
                    </li>
                    <li>
                      <a class="withripple" :href="initiative.social_networks.instagram" target="_blank">
                        <i class="mr-2 fa fa-instagram"></i> Instagram Page</a>
                    </li>

                  </ul>
                  <!-- ms-collapse-nav -->
                </div>

                <a href="#" class="btn btn-xlg btn-raised btn-primary btn-raised btn-block media-hide">
                  <i class="mr-2 fa fa-globe"></i>
                  LOCATE US
                  <div class="col-md-2"></div>
                </a>
                <hr/>

                <h3 class="color-primary no-mt">Address</h3>
                <p v-if="initiative.address">{{ initiative.address.cross }} Cross, {{ initiative.address.district }} District,<br/>{{ initiative.address.city }}</p>

              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- container -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            loader: true,
            initiative: {}
        }
    },
    created() {
        let _this = this;
        this.loader = true;
        this.$http.get(`http://www.localhost:8000/api/get-initiative-details?id=${this.$route.params.id}`).then(response => {
        // get body data
        console.log(response)
            setTimeout(() => {
                _this.initiative = response.body.data[0];
                _this.loader = false;
            }, 1000)
        
        }, response => {// error callback
        });
    }
}
</script>
<style scoped>
  .loader {
    text-align: center
  }
  .circular {
    animation: rotate 2s linear infinite;
    height: 100px;
    position: relative;
    width: 100px;
  }
  .path {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
    stroke: #33a9ff;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -124;
    }
  }
  @keyframes color {
    100%, 0% {
      stroke: #d62d20;
    }
    40% {
      stroke: #0057e7;
    }
    66% {
      stroke: #008744;
    }
    80%, 90% {
      stroke: #ffa700;
    }
  }
</style>


