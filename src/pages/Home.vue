<template>
  <div class="ms-site-container">

    <!-- Modal -->
    <div class="modal modal-primary" id="ms-account-modal-2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel-2">
      <div class="modal-dialog new-modal animated zoomIn animated-3x" role="document">
        <div class="modal-content">
          <div class="modal-header d-block shadow-2dp no-pb">
            <button type="button" class="close d-inline pull-right modal-close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                      <i class="zmdi zmdi-close"></i>
                    </span>
            </button>

          </div>
          <div class="modal-body">
            <div class="tab-content">

              <h3 class="no-m ms-site-title">We are already in love with you!!!</h3>
              <p class="lead lead-sm">Don't you love your friends who help you with your project?
                You are one such friend to us. Our aim is to list all the awesome mentoring initiatives in India on this website.
                Thank you for helping us reach our goal.</p>
              <hr/>

              <h5>#3 ways in which you can help us list your initiative</h5><br/>

              <table class="table">
                <tbody>
                <tr>
                  <td><i class="mr-2 fa fa-instagram"></i></td>
                  <td><span>Tag @lightthemap in you instagram post</span><br>
                    <p class="modal-text-color">Tag @lightthemap in one of your instagram posts showing the great
                      work you or your team is doing and
                      we will get in touch</p></td>
                </tr>
                <tr>
                  <td><i class="mr-2 fa fa-envelope"></i></td>
                  <td><span>Say hello to us at lightthemap@gmail.com</span><br>
                    <p class="modal-text-color">Drop us a hello at this email id: lightthemap@gmail.com with a
                      little detail about the initiative you want to list and we will follow up with you</p></td>
                </tr>

                </tbody>
              </table>

              <div class="form-group is-empty my-class-form">

                <div class="input-group">
                  <span class="input-group-addon modal-icon"><i class="mr-1 zmdi zmdi-square-right "></i></span>
                  <input type="text" id="addon1" class="form-control" placeholder="Leave your email with us">
                  <span class="input-group-btn">
                            <button class="btn btn-raised btn-default" type="button">Submit</button>
                          </span>
                </div>
                <label class="control-label modal-text-color" for="addon1">Submit your email above and we will get back to you and
                  learn all about your initiative. We will only use your email for our private conversation. No
                  cheating!</label>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ms-header ms-header-primary">
      <hr/>
      <div class="container">
        <div class="row">
          <div class="col-lg-7 pr-6">

            <div class="card card-body card-success cart-my-class" >
              <div class="media">

                <div class="media-body no-mt">
                  <h3 class="no-mt">Volunteer. Teach. Do what you love!</h3>
                  <p class="mobile-font-size">Light the map helps volunteers find awesome local initiatives which they can join.
                    Our aim is to help inspired individuals who want to make an impact find the the right kind of initiatives.
                    Whether you want to teach maths, english or skating, we will help you find or found a place.</p>
                </div>
              </div>
            </div>
            <div class="text-left">
              <a href="#"
                 class="btn btn-raised btn-xlg btn-default"
                 data-toggle="modal" data-target="#ms-account-modal-2"> Add Initiative</a>
              <a href="/find-initiative" class="btn btn-xlg new-color">Find Initiative</a>
            </div>
          </div>
          <div class="col-lg-5 text-center hide-image-on-mobile">
            <img src="../assets/img/No_Image.png" class="no-image" alt="no-image">
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-6">
      <div class="row">
        <div class="col-md-4 desktop-hide">
          <div class="card-body card-body-big card-body-big-bg  mb-6">

            <div class="row masonry-container">

              <div class="masonry-item">

                <h3 class="map-text">10 out of 300 cities in India have initiatives to mentor kids in need</h3>
                <!--<h3 class="map-text">intiatives to mentor kids in need</h3>-->

                <a href="#"
                   class="btn btn-raised btn-default mobil-button-position"
                   data-toggle="modal"
                   data-target="#ms-account-modal-2"
                >Add Initiative
                  <div class="ripple-container"></div>
                </a>

              </div>

            </div>
            <!-- row -->
          </div>
        </div>
        <div class="col-md-5">

          <div id="map"></div>
          <!--<img src="assets/img/bg-new.jpg" usemap="#image-map" class="" >-->

          <!--<map name="image-map">-->
          <!--<area target="_blank" alt="1" title="1" href="#" coords="151,198,10" shape="circle">-->
          <!--<area id="engine" target="_blank" alt="2" title="2" href="#" coords="322,281,9" shape="circle">-->
          <!--<area target="_blank" alt="3" title="3" href="#" coords="83,343,10" shape="circle">-->
          <!--<area target="_blank" alt="4" title="4" href="#" coords="130,333,9" shape="circle">-->
          <!--<area target="_blank" alt="5" title="5" href="#" coords="103,391,10" shape="circle">-->
          <!--<area target="_blank" alt="6" title="6" href="#" coords="151,392,10" shape="circle">-->
          <!--<area target="_blank" alt="7" title="7" href="#" coords="196,455,10" shape="circle">-->
          <!--</map>-->


        </div>
        <div class="col-md-4 mobile-hide">
          <div class="card-body card-body-big card-body-big-bg  mb-6">
            <div class="row">
              <div class="map-right-cont">
                <h3 class="map-text">10 out of 300 cities in India have initiatives to mentor kids in need</h3>
                <p class="font-size">Help us light the map by informing us about inspiring initiatives in your city.
                  This will help our users find these initiatives and contribute to them.
                  Our aim is have at least one initiative in every locality.</p>
                <a href="#" class="btn btn-raised btn-default" data-toggle="modal" data-target="#ms-account-modal-2">Add Initiative
                  <div class="ripple-container"></div>
                </a>
              </div>
            </div>
            <!-- row -->
          </div>
        </div>
        <div class="col-md-3">
          <div class="card card-warning">
            <div class="card-header">
              <h4 class="card-title">
                <i class="zmdi zmdi-star"></i> INITIATIVES BY CITY</h4>
            </div>
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action withripple"> Bangalore </a>
              <a href="#" class="list-group-item list-group-item-action withripple"> New Delhi </a>
              <a href="#" class="list-group-item list-group-item-action withripple"> Pune </a>
              <a href="#" class="list-group-item list-group-item-action withripple"> Chennai </a>
              <a href="#" class="list-group-item list-group-item-action withripple"> Mumbai </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "home",
        mounted () {
            let map = new google.maps.Map(document.getElementById('map'), {
              zoom: 4,
              center: new google.maps.LatLng(28.644800, 77.216721),
              mapTypeId: google.maps.MapTypeId.ROADMAP,
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

          let infowindow = new google.maps.InfoWindow();

          let marker;
          let icon = {
            url: "/static/img/circle-xxl.png", // url
            scaledSize: new google.maps.Size(20, 20), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
          };
          this.$http.get('http://www.localhost:8000/api/get-cities').then(response => {
            // get body data
            setCities(response.body.data);
          }, response => {
            // error callback
          });
          function setCities(data) {
            for(let i in data) {
              let lat = +data[i].lat;
              let lng = +data[i].lng;
              let name = data[i].name;

              marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat,lng),
                map: map,
                icon: icon
              });
              google.maps.event.addListener(marker, 'click', ((marker, i) => {
                return () => {
                  infowindow.setContent(name);
                  infowindow.open(map, marker);
                }
              })(marker, i));
            }
          }
        }
    }
</script>

<style scoped>
  hr {
    margin: 0 0 25px 0;
  }
</style>
