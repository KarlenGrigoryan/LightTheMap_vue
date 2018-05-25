<template>
  <div id="find-initiative" class="ms-site-container bg-color">
      <div class="ms-hero-page ms-hero-img-city2 ms-hero-bg-info">
        <div class="container">
          <div class="text-center">
            <h1 class="no-m ms-site-title color-white center-block ms-site-title-lg mt-2">Find Initiative</h1>
            <form class=" mt-4 mw-800 center-block">
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-group label-floating input-group ">
                    <label class="control-label color-white" for="ms-class-zip">
                      <i class="zmdi zmdi-pin mr-1"></i> City / Zipcode...</label>
                    <input type="text" id="ms-class-zip" class="form-control color-white" v-model="value"> </div>
                </div>
              </div>
              <button type="button" class="btn btn-raised btn-block" @click="search">
                <i class="zmdi zmdi-search"></i> Search</button>
            </form>
          </div>
        </div>
      </div>
      <hr/>

      <div class="container">

        <div class="row">
          <div class="col-lg-3 filter-option">
            <div class="card card-warning">
              <div class="card-header">
                <h3 class="card-title">Filter By Topic</h3>
              </div>
              <div class="card-body">
                <form class="form-horizontal" id="Filters">
                  <fieldset>
                    <div class="form-group no-mt">
                      <div class="checkbox" v-for="tag in tagsList" >
                        <label > <input type="checkbox" :value="`.${tag.id}`" @click="chooseTag(tag)"> {{ tag.name }} </label>
                      </div>
                    </div>
                  </fieldset>

                </form>
                <form class="form-horizontal">
                  <h4>Sort by</h4>
                  <select id="SortSelect" class="form-control selectpicker">
                    <option value="random">Popular</option>
                    <option value="date:asc">Release ASC</option>
                    <option value="date:desc">Release DESC</option>
                  </select>
                </form>
              </div>
            </div>
          </div>

          <div class="col-lg-9">
            <h1 class="right-line mb-4">{{ toTitleCase(value) }}</h1>
            <div class="loader" v-if="loader">
              <svg class="circular">
                  <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10" />
              </svg>
            </div>
            <div class="row" id="Container">
              <router-link :to="{ name: 'Portfolio', params: {id: initiative._id}}" class="table-link" v-for="(initiative, key) in initiatives" :key="key">
                <div class="card mb-1">
                  <ul class="listing-filter">
                    <li><img src="../assets/img/demo/products/m1.png" alt=""></li>
                    <li class="line-white top" >
                      <div class="li-top">
                        <h4 class="filter-title">{{ initiative.name }}</h4>
                        <p class="right-smile">
                          <span class="number-ch">
                            <i class="ion-happy-outline"></i>{{ initiative.students }} <span v-if="!initiative.students">0</span>
                          </span>
                        </p>
                      </div>
                      <div class="filter-title">
                        <h6 class="filter-content">Teach guitar to the local kids in {{ initiative.address.city }}</h6>
                      </div>
                      <div class="li-bottom">
                        <div>
                          <span href="#" class="btn btn-raised btn-xs btn-default ops-btn" v-for="(tag, key) in initiative.tags" :key="key">{{ tag.name }}</span>
                        </div>
                        <div class="mail-map">
                          <div aria-labelledby="dropdownMenuButton" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <router-link to="#" class="btn btn-raised btn-xs btn-default same-btn" >
                              <i class="mr-2 fa fa-envelope-o"></i>MAIL
                            </router-link>
                            <div class="dropdown-menu">
                              <span class="dropdown-item">{{ initiative.social_networks.email }}</span>
                            </div>
                          </div>
                          <div @click="openMap(initiative.address)">
                            <router-link to="#" class="btn btn-raised btn-xs btn-default same-btn" data-toggle="modal" data-target="#mapModal">
                              <i class="mr-2 fa fa-map-marker"></i>MAP
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- container -->
      <!-- Modal -->
      <div class="modal fade" id="mapModal" tabindex="-1" role="dialog" aria-labelledby="mapModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="mapModalLabel">Location</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body popup">
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
    export default {
        name: "find-initiative",
        data() {
          return {
            loader: false,
            value: '',
            cityName: '',
            initiatives: [],
            tagsList: [
              {
                  "name": "All",
                  "id": 1
              },
              {
                  "name": "Fine Arts",
                  "id": 2
              },
              {
                  "name": "Maths",
                  "id": 3
              },
              {
                  "name": "Guiter",
                  "id": 1
              },
              {
                  "name": "Spoken English",
                  "id": 5
              },
              {
                  "name": "Dance",
                  "id": 6
              },
              {
                  "name": "General Tutoring",
                  "id": 7
              }
            ],
            tags: []
          }
        },
        mounted() {
          // $('[data-toggle="tooltip"]').tooltip()
        },
        created() {
          if(this.$route.query.city) {
            this.value = this.$route.query.city
            this.getInitiatives(this.$route.query.city);
          }else {
            this.getInitiatives();
          }
        },
      methods: {
        search() {
            let _this = this;
            this.loader = true;
            // Check if search value is not empty
            if(this.value) {
              let body = {
                value: this.toTitleCase(this.value)
              };
              // Get initiatives by searched value
               this.$http.post('http://www.localhost:8000/api/find-initiative', body).then(response => {
                // // get body data
                _this.loader = false;
                _this.initiatives = response.body.data;
              }, response => {// error callback
              });
            }else {
                this.getInitiatives()
            }
        },
        chooseTag(tag) {
          let _this = this;
          this.loader = true;
          let index = this.tags.indexOf(tag);

          // Check if tag is selected
          if (index > -1) {
            this.tags.splice(index, 1);
          }else {
            this.tags.push(tag);
          }
          let body = {
            value: this.toTitleCase(this.value),
            tags: this.tags
          };

          //Filter initiatives
          this.$http.post('http://www.localhost:8000/api/find-initiative', body).then(response => {
            // Get body data
            _this.loader = false
            _this.initiatives = response.body.data;
          }, response => {// error callback
          });
        },
        getInitiatives(city) {
          let _this = this;
          this.loader = true;
          //Check if city is exist
          if(city) {
            let body = {
              value: this.toTitleCase(city)
            };
            // Get initiatives by city
            this.$http.post('http://www.localhost:8000/api/find-initiative', body).then(response => {
              // get body data
              _this.loader = false
              _this.initiatives = response.body.data;
            }, response => {// error callback
            });
          }else {
            this.$http.post('http://www.localhost:8000/api/find-initiative').then(response => {
              // get body data
              _this.loader = false
              _this.initiatives = response.body.data;
            }, response => {// error callback
            });
          }
        },
        getTags() {
          let _this = this;
          this.$http.get('http://www.localhost:8000/api/get-tags').then(response => {
            // get body data
            _this.tagsList = response.body.data[0].tags;
            console.log(_this.tags)
          }, response => {// error callback
          });
        },
        openMap(mapDetails) {
          let infowindow = new google.maps.InfoWindow();
          let icon = {
            url: "/static/img/circle-xxl.png", // url
            scaledSize: new google.maps.Size(20, 20), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
          };
          var uluru = {lat: Number(mapDetails.coordinates.lat),lng: Number(mapDetails.coordinates.lng)};
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
                  infowindow.setContent(mapDetails.city);
                  infowindow.open(map, marker);
                }
              })(marker));
        },
        toTitleCase(str){
          return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }

      }
    }
</script>

<style scoped>
  .table-link {
    width: 70%
  }
  .listing-filter li {
    position: relative
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
