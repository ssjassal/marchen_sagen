
// console.clear();
//================================
//-----API Domains Dev & Prod-----
//================================

var frontend_domain = "http://localhost:8000/";
var backend_domain = "http://localhost:3000/";
// var frontend_domain = 'https://shielded-journey-frontend-40635.herokuapp.com/';
// var backend_domain = 'https://shielded-journey-40635.herokuapp.com/';
//========================
//-----Angular Module-----
//========================
var app = angular.module('MSApp', []);


//========================
//-----Storyteller Controller----
//========================
app.controller('StorytellerController',['$http',function($http){
   this.Storyteller = 'Soniya';


}]);
//========================
//-----Story Controller----
//========================
app.controller('StoryController', ['$http', function($http){

   this.category = [];
   this.recentSnippet = false;


   this.name = 'Soniya Jassal';
   this.date_created = 'May 26, 2017';
   this.title = 'Once Upon a Time...';
   this.img = 'https://s-media-cache-ak0.pinimg.com/736x/e9/08/76/e908769e80d88f74139c4ebb84738229.jpg'
   this.description = 'This is a description of the story to be built'
   this.storyContent = 'Once Upon a Time tells the story of a new world, one in which fairy-tale legends and modern life collide.';
   this.category = ['Fantasy', 'Sci-Fi', 'Historical', 'Biographical']
   this.snippet = ['There was a fairy lawyer who was all feeling a woe', 'She traveld far and wide to find her Troll', 'But alas all she could find was a man who bowled.']

   this.recentSnippets = function(){
      this.recentSnippet = true;
   }
}]);
