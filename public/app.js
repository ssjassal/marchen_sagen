
console.clear();

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

   this.storyCategory = '';
   this.date_created = '';
   this.title = '';
   this.img = '';
   this.description = '';
   this.storyContent = '';
   this.categories = [];
   this.snippets = [];
   this.recentSnippets = [];
   this.stories = [];
   this.snippetTitle = [];
   this.allSnippetsTitle =[];
   this.category = [];
   this.createStory = false;
   this.recentSnippet = false;
   this.allStories = false;
   this.addSnippet = false;

   //==============================
   //----Story: Get All Stories----
   //==============================

   $http({
     method: 'GET',
     url: backend_domain + '/stories'
   }).then(function(result){
   //   var today = new Date();
   //   var date = today.getFullYear() + '-' + (today.getMonth() + 1 ) + '-' + today.getDate() + 'T';
   //   var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
     //console.log('Stories: ', result);
     this.stories = result.data.reverse();
     console.log(this.addSnippet);
   //   localStorage.setItem('', this.stories);
     this.categories = result.data;
     this.setRecentSnippetTitle();
   }.bind(this));

   //===========================
   //---Story: Create Stories---
   //===========================
   this.newStory = function(){
      $http({ // Makes HTTP request to server
        method: 'POST',
        url: backend_domain + '/stories',
        data: {
          story: { // Gets turned into req.body
           title: this.title,
           description: this.description,
           content: this.content,
           category: this.category,
           img: this.image
          }
        }
      }).then(function(response) {
        //console.log(response);
      }.bind(this));
   }

   //===============================
   //----Story: Get All Snippets----
   //===============================

   $http({
     method: 'GET',
     url: backend_domain + '/snippets'
   }).then(function(result){
     //console.log('Snippets: ',result.data);
   //   console.log(JSON.parse(localStorage.getItem('stories')));
     this.snippets = result.data;
      //this.recentSnippets = result.data; //if created by is within a certain period time - TBD
   }.bind(this));

   //==============================================
   //---Story: Function Set Recent Snippet Title---
   //==============================================
   this.setRecentSnippetTitle = function(){
      //console.log('This.Snippets: ',this.snippets);
    //   this.setSnippetTitle();
      //console.log('This.Stories: ', this.stories);
      for (var i = this.snippets.length - 1; i > (this.snippets.length - 6) ; i--) {
             this.recentSnippets.push(this.snippets[i]);
             //console.log('Recent Snippets: ',this.recentSnippets);
      }
      for (var i = 0; i < this.recentSnippets.length; i++) {
          //console.log('In FOR loop', i);
          for (var j = 0; j < this.stories.length; j++) {
             //console.log('In second FOR loop', j);
             //console.log('Recent Snippet Story ID ', this.recentSnippets[i].story_id );
             //console.log('Stories Story ID ', this.stories[j].id);
             if (this.recentSnippets[i].story_id === this.stories[j].id){
                 //console.log('In IF statement [i], [j], storytitle', i,j,this.stories[i].title);
                 this.snippetTitle.push(this.stories[j].title);
                 //console.log('Snippet Title after push: ',this.snippetTitle);
             }

          }

       }
   }
   //=======================================
   //---Story: Function Show All Snippets---
   //=======================================
   this.showSnippets = function(){
      // console.log('recentSnippet: '+ this.recentSnippet);
      // console.log('allStories: '+ this.allStories);
      this.recentSnippet = true;  //show
      // console.log('recentSnippet: '+ this.recentSnippet);
      this.allStories = true; //hide
      this.createStory = false;
      // console.log('allStories: '+ this.allStories);
      this. displaySnippets();
   }
   //==========================================
   //---Story: Function Display All Snippets---
   //==========================================
   this.displaySnippets = function(){
      console.log('Snips: ',this.snippets);
      console.log('Stories: ', this.stories);

      for (var i = 0; i < this.snippets.length; i++) {
          //console.log('In FOR loop', i);
          for (var j = 0; j < this.stories.length; j++) {
             //console.log('In second FOR loop', j);
             //console.log('Recent Snippet Story ID ', this.recentSnippets[i].story_id );
             //console.log('Stories Story ID ', this.stories[j].id);
             if (this.snippets[i].story_id === this.stories[j].id){
                 //console.log('In IF statement [i], [j], storytitle', i,j,this.stories[i].title);
                 this.allSnippetsTitle.push(this.stories[j].title);
                 //console.log('Snippet Title after push: ',this.snippetTitle);
             }
          }
       }
   }

   this.addSnippets = function(){
      this.addSnippet = true;
      console.log(this.addSnippet);
      this.allStories = true;
   }
   this.goHome = function(){
      this.recentSnippet = false;  //show
      this.allStories = false; //hide
      this.createStory = false;
   }

   this.createStories = function(){
      this.createStory = true;
      this.allStories = true;
      this.recentSnippet = false; //show form
   }

   this.setIndex = function(index){
      console.log('tile: ', this.story[index].title);
      console.log('tile: ', this.story[index].description);
      console.log('tile: ', this.story[index].category);
      console.log('tile: ', this.story[index].img);
      this.title = this.story[index].title;
      this.description = this.story[index].description;
      this.storyCategory = this.story[index].category;
      this.img = this.story[index].img;

   }

}]);
