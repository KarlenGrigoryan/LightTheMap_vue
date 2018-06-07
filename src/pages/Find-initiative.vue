<template>
  <div id="find-initiative" class="ms-site-container bg-color">
      <div class="ms-hero-page ms-hero-img-city2 ms-hero-bg-info">
        <div class="container">
          <div class="text-center">
            <h1 class="no-m ms-site-title color-white center-block ms-site-title-lg mt-2">Find Initiative</h1>
            <form class=" mt-4 mw-800 center-block" v-on:submit.prevent="search">
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-group label-floating input-group">
                    <label class="control-label color-white" for="ms-class-zip">
                      <i class="zmdi zmdi-pin mr-1"></i> City / Zipcode...</label>
                    <input type="text" id="ms-class-zip"  class="form-control color-white" v-model="value" placeholder=""> </div>
                </div>
              </div>
              <button type="submit" class="btn btn-raised btn-block" >
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
                      <div class="checkbox md-checkbox" v-for="(tag,index) in tagsList" v-bind:key="index">
                        <input type="checkbox"  :value="`check_${tag.id}`" :id="`check_${tag.id}`" @click="chooseTag(tag); tag.checked = !tag.checked" :checked="tag.checked"> 
                        <label :for="`check_${tag.id}`"> 
                          {{ tag.name }} 
                        </label>
                      </div>
                    </div>
                  </fieldset>

                </form>
                <form class="form-horizontal">
                  <h4>Sort by</h4>
                  <select id="SortSelect" class="form-control selectpicker" v-model="sort" @change="chooseSort(sort)">
                    <option value="0">Popular</option>
                    <option value="-1">Posted On - Old to New </option>
                    <option value="1">Posted on - New to Old </option>
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
                    <li><img :src="initiative.medias.profle" alt="" width="80"></li>
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
                          <div @click="sendMail(initiative)">
                            <router-link to="#" class="btn btn-raised btn-xs btn-default same-btn" >
                              <i class="mr-2 fa fa-envelope-o"></i>MAIL
                            </router-link>
                            
                          </div>
                          <div @click="openMap(initiative)">
                            <router-link to="#" class="btn btn-raised btn-xs btn-default same-btn">
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
  </div>
</template>

<script>
import config from '../config'

    export default {
        name: "find-initiative",
        data() {
          return {
            loader: false,
            value: '',
            cityName: '',
            sort: '',
            sortVal: 0,
            initiatives: [],
            tagsList: [
              {
                  "name": "All",
                  "id": 1,
                  "checked": false
              },
              {
                  "name": "Fine Arts",
                  "id": 2,
                  "checked": false
              },
              {
                  "name": "Maths",
                  "id": 3,
                  "checked": false
              },
              {
                  "name": "Guiter",
                  "id": 4,
                  "checked": false
              },
              {
                  "name": "Spoken English",
                  "id": 5,
                  "checked": false
              },
              {
                  "name": "Dance",
                  "id": 6,
                  "checked": false
              },
              {
                  "name": "General Tutoring",
                  "id": 7,
                  "checked": false
              }
            ],
            tags: []
          }
        },
        mounted() {
          let _this = this;
        // Create the search box and link it to the UI element.
        var input = document.getElementById('ms-class-zip');
        var searchBox = new google.maps.places.SearchBox(input);

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            _this.getCity(place.geometry.location.lat(), place.geometry.location.lng())
            if (!place.geometry) {
              return;
            }
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
        });
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
        getCity(lat, lng) {
          this.$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=false?key=AIzaSyBVsiPF2PDAmQ7AUqOJrQr82_9dMjVAdsc?project=My Project 21800', ).then(response => {
                // Get body data
              function findPosName(value) {
                      return value.types["0"] === 'locality';
                    }
                    var currentPost = response.body.results["0"].address_components.filter(findPosName)
                    this.value = currentPost["0"].long_name
                    this.getInitiatives(currentPost["0"].long_name);
              }, response => {// error callback
              
              });
        },
        search() {
            let _this = this;
            this.loader = true;
            // Check if search value is not empty
            if(this.value) {
              let body = {
                value: this.toTitleCase(this.value),
                tags: this.tags,
                sort: {
                  release: this.sortVal
                }
              };
              // Get initiatives by searched value
               this.$http.post(`${config.server.api}/api/find-initiative`, body).then(response => {
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

          if(tag.id === 1) {
            this.tags = [];
            for(var i = 1; i< this.tagsList.length; i++) {
              this.tagsList[i].checked = false
            }
            let body = {
              value: this.toTitleCase(this.value),
              tags: this.tags,              
              sort: {
                release: this.sortVal
              }
            };
            //Filter initiatives
            this.$http.post(`${config.server.api}/api/find-initiative`, body).then(response => {
              // Get body data
              _this.loader = false
              _this.initiatives = response.body.data;
            }, response => {// error callback
            });
          }else {
             // Check if tag is selected
              if (index > -1) {
                this.tags.splice(index, 1);
              }else {
                this.tags.push(tag);
              }
              let body = {
                value: this.toTitleCase(this.value),
                tags: this.tags,
                sort: {
                  release: this.sortVal
                }
              };

              //Filter initiatives
              this.$http.post(`${config.server.api}/api/find-initiative`, body).then(response => {
                // Get body data
                _this.loader = false
                _this.initiatives = response.body.data;
              }, response => {// error callback
              });
          }
        },
        chooseSort(sortVal) {
          let _this = this;
          this.loader = true;
          this.sortVal = +sortVal;
          let body = {
            value: this.toTitleCase(this.value),
            tags: this.tags,
            sort: {
              release: +sortVal
            }
          };
          this.$http.post(`${config.server.api}/find-initiative`, body).then(response => {
            // Get body data
            _this.loader = false;
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
            this.$http.post(`${config.server.api}/api/find-initiative`, body).then(response => {
              // get body data
              _this.loader = false
              _this.initiatives = response.body.data;
            }, response => {// error callback
            });
          }else {
            this.$http.post(`${config.server.api}/api/find-initiative`).then(response => {
              // get body data
              _this.loader = false
              _this.initiatives = response.body.data;
            }, response => {// error callback
            });
          }
        },
        getTags() {
          let _this = this;
          this.$http.get(`${config.server.api}/api/get-tags`).then(response => {
            // get body data
            _this.tagsList = response.body.data[0].tags;
          }, response => {// error callback
          });
        },
        openMap(mapDetails) {
            let fullAdrress = `${ mapDetails.address.cross } Cross, ${ mapDetails.address.district } District,${ mapDetails.address.city }`;
            window.open(`https://www.google.com/maps/search/${fullAdrress}/@${mapDetails.address.coordinates.lat},${mapDetails.address.coordinates.lng}`, '_blank')          
        },
        sendMail(initiative) {
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${initiative.social_networks.email}&su=initiative&body=message..`, '_blank')
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
  .form-group .checkbox label {
    margin-left: 5px;
  }
  @media (max-width: 768px) {
    .table-link {
      width: 100%
    }
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
