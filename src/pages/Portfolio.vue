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
                      <li v-if="initiative.medias"><img :src="initiative.medias.profle" alt="" width="80"></li>
                      <li>
                          <h4 class="filter-title">{{ initiative.name }}</h4>
                          <h6 class="filter-content" v-if="initiative.address">Teach guitar to the local kids in {{ initiative.address.city }}</h6>
                          <span href="#" class="btn btn-raised btn-xs btn-default ops-btn" v-for="(tag, key) in initiative.tags" :key="key">{{ tag.name }}</span>
                      </li>
                      <li class="top"><span class="number-ch"><i class="ion-happy-outline"></i>{{ initiative.students }} Students</span></li>
                  </ul>
              </div>

              <div class="panel-menu " id="collapseMenu-1">

                  <a :href="`https://www.google.com/maps/search/${fullAdrress}/@${initiative.address.coordinates.lat},${initiative.address.coordinates.lng}`" target="_blank" class="btn btn-xlg btn-raised btn-primary btn-raised btn-block media-show">
                      <i class="mr-2 fa fa-globe"></i>
                      LOCATE US
                      <div class="col-md-2"></div>
                  </a>

                  <a :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${initiative.social_networks.email}&su=initiative&body=message..`" target="_blank" class="btn btn-xlg btn-block btn-raised btn-primary btn-success media-show">
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
                <div v-if="initiative.about">
                  <p v-if="initiative.about.first_part">{{ initiative.about.first_part }}</p>
                  <blockquote class="blockquote blockquote-big" v-if="initiative.about.citation">
                    <p>{{ initiative.about.citation.description }}</p>
                    <footer>{{ initiative.about.citation.author }}
                      <!-- <cite title="Source Title">Source Title</cite> -->
                    </footer>
                  </blockquote>
                  <p v-if="initiative.about.last_part">{{ initiative.about.last_part }}</p>
                  <!-- <p v-html="initiative.about"></p> -->
                </div>
                
              </div>
            </div>
          </div>
          <div class="col-lg-4 media-hide">

            <div class="card">

              <div class="card-body">

                <div class="panel-menu" id="collapseMenu">

                    <a :href="`https://www.google.com/maps/search/${fullAdrress}/@${initiative.address.coordinates.lat},${initiative.address.coordinates.lng}`" target="_blank"  class="btn btn-xlg btn-raised btn-primary btn-raised btn-block media-show">
                        <i class="mr-2 fa fa-globe"></i>
                        LOCATE US
                        <div class="col-md-2"></div>
                    </a>

                  <a :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${initiative.social_networks.email}&su=initiative&body=message..`" target="_blank" class="btn btn-xlg btn-block btn-raised btn-primary btn-success">
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

                <!-- <a href="#" class="btn btn-xlg btn-raised btn-primary btn-raised btn-block media-hide" data-toggle="modal" data-target="#locateUsModal" @click="openModal">
                  <i class="mr-2 fa fa-globe"></i>
                  LOCATE US
                  <div class="col-md-2"></div>
                </a> -->
                <a :href="`https://www.google.com/maps/search/${fullAdrress}/@${initiative.address.coordinates.lat},${initiative.address.coordinates.lng}`" target="_blank" class="btn btn-xlg btn-raised btn-primary btn-raised btn-block media-hide">
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
       <!-- Modal -->
      <div class="modal fade" id="locateUsModal" tabindex="-1" role="dialog" aria-labelledby="mapModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="mapModalLabel">Locate Us</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div id="map" style="height: 400px; width: 100%; position: relative"></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import config from '../config'
export default {
    data() {
        return {
            loader: true,
            initiative: {},
            fullAdrress: ''
        }
    },
    created() {
        let _this = this;
        this.loader = true;
        this.$http.get(`${config.server.api}/api/get-initiative-details?id=${this.$route.params.id}`).then(response => {
        // get body data
        console.log(response)
            setTimeout(() => {
                _this.initiative = response.body.data[0];
                _this.fullAdrress = `${ _this.initiative.address.cross } Cross, ${ _this.initiative.address.district } District,${ _this.initiative.address.city }`;
                _this.loader = false;
            }, 1000)
        }, response => {// error callback
        });
    },
    methods: {
      openModal() {
        let infowindow = new google.maps.InfoWindow();
          let icon = {
            url: "/static/img/circle-xxl.png", // url
            scaledSize: new google.maps.Size(20, 20), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
          };
          var uluru = {lat: 28.644800,lng: 77.216721};
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 4,
              center: uluru,
              styles: [
                {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#e9e9e9"
                    },
                    {
                      "lightness": 17
                    }
                  ]
                },
                {
                  "featureType": "landscape",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#f5f5f5"
                    },
                    {
                      "lightness": 20
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#ffffff"
                    },
                    {
                      "lightness": 17
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#ffffff"
                    },
                    {
                      "lightness": 29
                    },
                    {
                      "weight": 0.2
                    }
                  ]
                },
                {
                  "featureType": "road.arterial",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#ffffff"
                    },
                    {
                      "lightness": 18
                    }
                  ]
                },
                {
                  "featureType": "road.local",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#ffffff"
                    },
                    {
                      "lightness": 16
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#f5f5f5"
                    },
                    {
                      "lightness": 21
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#dedede"
                    },
                    {
                      "lightness": 21
                    }
                  ]
                },
                {
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "visibility": "on"
                    },
                    {
                      "color": "#ffffff"
                    },
                    {
                      "lightness": 16
                    }
                  ]
                },
                {
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "saturation": 36
                    },
                    {
                      "color": "#333333"
                    },
                    {
                      "lightness": 40
                    }
                  ]
                },
                {
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "transit",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#f2f2f2"
                    },
                    {
                      "lightness": 19
                    }
                  ]
                },
                {
                  "featureType": "administrative",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#fefefe"
                    },
                    {
                      "lightness": 20
                    }
                  ]
                },
                {
                  "featureType": "administrative",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#fefefe"
                    },
                    {
                      "lightness": 17
                    },
                    {
                      "weight": 1.2
                    }
                  ]
                }
              ]
            });
            var marker = new google.maps.Marker({
              position: uluru,
              map: map,
              icon: icon
            });
             google.maps.event.addListener(marker, 'click', ((marker) => {
                return () => {
                  infowindow.setContent('New Delhi');
                  infowindow.open(map, marker);
                }
              })(marker));
      }
    }
}
</script>
<style scoped>
  .listing-filter {
    display: block
  }
  ul.listing-filter li:nth-child(-n+2) {
    margin: 0;
    padding: 7px 10px 7px 7px;
  }
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


