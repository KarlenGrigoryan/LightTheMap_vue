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
                      <!-- <div class="checkbox" v-for="tag in tags">
                        <label @click="chooseTag(tag)"> <input type="checkbox" :value="`.${tag.id}`"> {{ tag.name }} </label>
                      </div> -->
                      <div class="checkbox">
                        <label @click="chooseTag(2)"> <input type="checkbox" value=".tablet"> Fine Arts </label>
                      </div>
                      <div class="checkbox">
                        <label> <input type="checkbox" value=".laptop" @click="chooseTag(2)"> Maths </label>
                      </div>
                      <div class="checkbox">
                        <label> <input type="checkbox" value=".accessory"> Spoken English </label>
                      </div>
                      <div class="checkbox">
                        <label> <input type="checkbox" value=".accessory"> Dance </label>
                      </div>
                      <div class="checkbox">
                        <label> <input type="checkbox" value=".accessory"> General Tutoring </label>
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
            <h1 class="right-line mb-4">Bangalore</h1>

            <div class="row" id="Container">

              <a href="#" class="table-link" v-for="initiative in initiatives">
                <div class="card mb-1">
                  <ul class="listing-filter">
                    <li><img src="../assets/img/demo/products/m1.png" alt=""></li>
                    <li class="line-white">
                      <h4 class="filter-title">{{ initiative.name }}</h4>
                      <h6 class="filter-content">Teach guitar to the local kids in {{ initiative.address.city }}</h6>
                      <span href="#" class="btn btn-raised btn-xs btn-default ops-btn" v-for="tag in initiative.tags">{{ tag.name }}</span>
                    </li>
                    <li><a href="#" class="btn btn-raised btn-xs btn-default"><i class="mr-2 fa fa-envelope-o"></i>MAIL</a></li>
                    <li><a href="#" class="btn btn-raised btn-xs btn-default"><i class="mr-2 fa fa-map-marker"></i>MAP</a></li>
                    <li class="top"><span class="number-ch"><i class="ion-happy-outline"></i>{{ initiative.students }}</span></li>
                  </ul>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- container -->
  </div>
</template>

<script>
    export default {
        name: "find-initiative",
        data() {
          return {
            value: '',
            initiatives: [],
            tags: []
          }
        },
        created() {
          if(this.$route.query.city) {
            console.log(this.$route.query.city)
          };

          this.getInitiatives();
        },
      methods: {
        search() {
            let _this = this;
            if(this.value) {
              let body = {
                value: this.value
              };
              console.log(body)
               this.$http.post('http://www.localhost:8000/api/find-initiative', body).then(response => {
                // // get body data
                _this.initiatives = response.body.data;
              }, response => {
                // error callback
              });
            }else {
                this.getInitiatives()
            }
        },
        chooseTag(tag) {
          let _this = this;
          var index = this.tags.indexOf({id: tag});
          console.log(index)
          this.tags.push(...{id: tag});
          console.log(this.tags)
          let body = {
            value: this.value,
            tags: [
              {
                id: tag
              }
            ]
          };
          this.$http.post('http://www.localhost:8000/api/find-initiative', body).then(response => {

            // get body data
            _this.initiatives = response.body.data;
            console.log(response.body);


          }, response => {
            // error callback
          });
          console.log(body)
        },
        getInitiatives() {
          let _this = this;
          this.$http.post('http://www.localhost:8000/api/find-initiative').then(response => {

            // get body data
            _this.initiatives = response.body.data;
            console.log(response.body);


          }, response => {
            // error callback
          });
        },
        getTags() {
          let _this = this;
          this.$http.get('http://www.localhost:8000/api/get-tags').then(response => {

            // get body data
            _this.tags = response.body.data[0].tags;
            console.log(_this.tags)

          }, response => {
            // error callback
          });
        }
      }
    }
</script>

<style scoped>

</style>
