
const menu_item = Vue.component('cocktail-menu-item', {
  template: '<div class="container_fluid cocktail_details"><div class="d-flex justify-content-center mb-3"><div class="p-2">\
  <h1>{{cocktail.name}}</h1>\
  {{cocktail.served}}<br><br>\
  <h2>Ingredients</h2>\
  <ul>\
    <li v-for="ingredient in cocktail.ingredients">{{ingredient.measure}} {{ingredient.unit}} {{ingredient.ingredient}}</li>\
  </ul>\
  <h2 v-if="cocktail.preparation">Preparation</h2>\
  <ul>\
    <li v-for="prep in cocktail.preparation">{{prep}}</li>\
  </ul>\
  </div></div></div>',
  watch: {
    '$route' (to, from){
      $("#cocktail_menu").hide();
      this.getData();
    }
  },
  data() {
    return {
      cocktail: {}
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function(){
      var self = this;
      $.getJSON("/data/cocktails.json", function(data) {
        for(index in data)
        {
          cocktail = data[index];
          if(self.$route.params.cocktail_url == cocktail["url"])
          {
            self.cocktail = cocktail;
            return
          }
        }
      })
    }
  }
})

const router = new VueRouter({
  routes: [
    { name: 'cocktail', path: '/cocktail/:cocktail_url', component: menu_item}
  ]
})

const app = new Vue({
router,
el: '#app',
data: {
  cocktails: []
},
mounted() {
  var self = this;
  $.getJSON("/data/cocktails.json", function(data) {
    self.cocktails = data;
  })
},
computed:{
  groupedCocktails() {
    const chunk = (arr, chunkSize, cache = []) => {
      const tmp = [...arr]
      while (tmp.length) cache.push(tmp.splice(0, chunkSize))
      return cache
    }

    return chunk(this.cocktails, 3)
  }
}
})
