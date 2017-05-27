// console.clear();
//================================
//-----API Domains Dev & Prod-----
//================================

var frontend_domain = "http://localhost:8000/";
var backend_domain = "http://localhost:3000/";
// var frontend_domain = '';
// var backend_domain = '';
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

   this.story = 'Test Story';
}]);
