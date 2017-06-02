
console.clear();

//================================
//-----API Domains Dev & Prod-----
//================================
var frontend_domain = "http://localhost:8000";
var backend_domain = "http://localhost:3000";
// var frontend_domain = 'https://still-fortress-frontend-94098.herokuapp.com';
// var backend_domain = 'https://still-fortress-94098.herokuapp.com'; //https://still-fortress-94098.herokuapp.com/

//========================
//-----Angular Module-----
//========================
var app = angular.module('MSApp', []);


// ===============================
// -----Storyteller Controller----
// ===============================
// app.controller('StorytellerController',['$http',function($http){
//
//
//
// }]);
//========================
//-----Story Controller----
//========================
app.controller('StoryController', ['$http', function($http){

   //====================================
   //----Story: Initializing Var----
   //====================================
   this.storyCategory = '';
   this.date_created = '';
   this.title = '';
   this.img = '';
   this.description = '';
   this.storyContent = '';
   this.story_id = '';
   this.storyteller_id = '';
   this.snippet = '';
   this.index = '';
   this.mergedContent = '';
   this.storyTitle = '';
   this.storyDescription = '';
   this.storyImg = '';
   this.storyStory = '';
   this.viewStoryIndex = '';
   this.mergedContentArray = [];
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
   this.viewStory = false;
   this.isRegistered = false;

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
     this.mergeSnippetToStory();
     this.setRecentSnippetTitle();
     //console.log('Recent Snippets: ',this.recentSnippets);
   }.bind(this));

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
   }.bind(this));

   //====================================
   //---Story: Function Create Stories---
   //====================================
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
         window.location.href = frontend_domain + '/storyapp.html';
      }.bind(this));
   }

   //===========================================
   //----Story: Function Create New Snippets----
   //===========================================
   this.newSnippet = function(){
      // console.log(this.index);
      // console.log(this.stories[this.index].id);
      if(this.viewStoryIndex != ''){
         this.story_id = this.stories[this.viewStoryIndex].id;
      }else{
         this.story_id = this.stories[this.index].id;
      }
      this.snippet = this.snippet.toString();
      //console.log(this.snippet);
      // console.log(this.stories[index].id);
      // this.storyteller_id = this.storytellers //need storyteller id passed
      $http({ // Makes HTTP request to server
        method: 'POST',
        url: backend_domain + '/snippets',
        data: {
          snippet: { // Gets turned into req.body
           story_id: this.story_id,
           snip: this.snippet,
           storyteller_id: 2
          }
        }
      }).then(function(response) {
         window.location.href = frontend_domain + '/storyapp.html';
        //console.log(response);
      }.bind(this));

   }

   //=========================================
   //---Story: Function Merge Snippet Story---
   //=========================================
   this.mergeSnippetToStory = function(){
      //console.log(this.stories);
      //console.log('Merge Snippet');
      for (var i = 0; i < this.stories.length; i++) {
         this.mergedContent = this.stories[i].content;
         //console.log('Merged Content: ' + this.mergedContent);
         if(this.stories[i].snippets.length != 0){
            //console.log('Story Content: ', this.stories[i].content);
            //console.log('Snippets', this.stories[i].snippets);
            var snipLength = 0;
            snipLength = this.stories[i].snippets.length;
            for (var j = 0; j < snipLength; j++) {
               this.mergedContent += " " + this.stories[i].snippets[j].snip;
            }
         }
         this.mergedContentArray.push(this.mergedContent);
         //console.log('Merged Content Array: ' + this.mergedContentArray);
         //console.log('Merged Content Array 3: ' + this.mergedContentArray[3]);
      }
   }

   //==============================================
   //---Story: Function Set Recent Snippet Title---
   //==============================================
   this.setRecentSnippetTitle = function(){
      //console.log('This.Snippets: ',this.snippets);
    //   this.setSnippetTitle();
      //console.log('This.Stories: ', this.stories);
      //CHECK FOR THIS.SNIPPETS.LENGTH IS LESS THAN 6-Need to verify
      if (this.snippets.length >= 6){
         for (var i = this.snippets.length - 1; i > (this.snippets.length - 6) ; i--) {
               // console.log('i: ', i);
               //console.log('Snippets: ', this.snippets[i]);
                this.recentSnippets.push(this.snippets[i]);
               // console.log('Recent Snip: ', this.recentSnippets);
               // console.log('Recent Snip: ', this.recentSnippets[]);
         }
      }else{
         for (var i = 0 ; i <= this.snippets.length ; i++) {
               // console.log('i: ', i);
               //console.log('Snippets: ', this.snippets[i]);
                this.recentSnippets.push(this.snippets[i]);
                this.recentSnippets = this.recentSnippets.reverse();
               // console.log('Recent Snip: ', this.recentSnippets);
               // console.log('Recent Snip: ', this.recentSnippets[]);
         }
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
      //console.log('Snips: ',this.snippets);
      //console.log('Stories: ', this.stories);;

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

   //======================================
   //---Story: Function Add New Snippets---
   //======================================
   this.addSnippets = function(index){
      // console.log(index);
      // console.log('title: ', this.stories[index].title);
      // console.log('description: ', this.stories[index].description);
      // console.log('category: ', this.stories[index].category);
      // console.log('image: ', this.stories[index].img);
      this.index = index;
      this.title = this.stories[index].title;
      this.description = this.stories[index].description;
      this.storyCategory = this.stories[index].category;
      this.img = this.stories[index].img;
      this.addSnippet = true;
      //console.log(this.addSnippet);
      this.allStories = true;
   }
   //================================================
   //---Story: Function Add New View Story Snippet---
   //================================================
   this.viewStorySnippets = function(){
      // console.log(index);
      // console.log('title: ', this.stories[index].title);
      // console.log('description: ', this.stories[index].description);
      // console.log('category: ', this.stories[index].category);
      // console.log('image: ', this.stories[index].img);

      this.title = this.stories[this.viewStoryIndex].title;
      this.description = this.stories[this.viewStoryIndex].description;
      this.storyCategory = this.stories[this.viewStoryIndex].category;
      this.img = this.stories[this.viewStoryIndex].img;
      this.addSnippet = true;
      //console.log(this.addSnippet);
      this.allStories = true;
   }

   //=========================================
   //---Story: Function Return to Home Page---
   //=========================================
   this.goHome = function(){
      this.recentSnippet = false;  //show
      this.allStories = false; //hide
      this.createStory = false;
   }

   //======================================
   //---Story: Function Create New Story---
   //======================================
   this.createStories = function(){
      this.createStory = true;
      this.allStories = true;
      this.recentSnippet = false; //show form
   }

   //================================
   //---Story: Function View Story---
   //================================
   this.viewStory= function(index){
      // console.log('View Story Index: ', index)
      // console.log(this.stories[index].title);
      this.viewStoryIndex = index;
      this.storyTitle = this.stories[index].title;
      this.storyDescription = this.stories[index].description;
      this.storyImg = this.stories[index].img;
      this.viewStoryContent = this.stories[index].content;

      //console.log('Merged Content: ' + this.mergedContent);
      if(this.stories[index].snippets.length != 0){
         //console.log('Story Content: ', this.stories[i].content);
         //console.log('Snippets', this.stories[i].snippets);
         var snip_Length = 0;
         snip_Length = this.stories[index].snippets.length;
         for (var j = 0; j < snip_Length; j++) {
            this.viewStoryContent += " " + this.stories[index].snippets[j].snip;
         }
      }
      this.viewStory = true;
      this.allStories = true;
   }

   //=======================================
   //----Storyteller: Create Storyteller----
   //=======================================
   this.createStoryteller = function(author){

     console.log('create new storyteller');
     console.log(author.username);
     console.log(author.password);
     console.log(author.name);
     // console.log(this.email);
     // console.log(this.img);
       if((this.username == '') ||
          (this.username == 'undefined')||
          (this.name == '') ||
          (this.name == 'undefined') ||
          (this.password == '') ||
          (this.password == 'undefined')){
          this.isRegistered = false;
          this.createStorytellerMessage = "Your registration is incomplete";
          return;
       }

        $http({ // Makes HTTP request to server
          method: 'POST',
          url: backend_domain + '/storytellers',
          data: { // Gets turned into req.body
            username: author.username,
            name: author.name,
            img: author.img,
            password: author.password,
            email: author.email,
          }
        }).then(function(response) {
          console.log(response);
          if(response.status == 201)
          {
             window.location.href = frontend_domain; //"http://localhost:8000";
          }
      });
   }

}]);
//======================
//----Graveyard Code----
//======================

// this.newViewStorySnippet = function(index){
//    // console.log(this.index);
//    // console.log(this.stories[this.index].id);
//    this.story_id = this.stories[index].id;
//    this.snippet = this.snippet.toString();
//    //console.log(this.snippet);
//    // console.log(this.stories[index].id);
//    // this.storyteller_id = this.storytellers //need storyteller id passed
//    $http({ // Makes HTTP request to server
//      method: 'POST',
//      url: backend_domain + '/snippets',
//      data: {
//        snippet: { // Gets turned into req.body
//         story_id: this.story_id,
//         snip: this.snippet,
//         storyteller_id: 2
//        }
//      }
//    }).then(function(response) {
//       window.location.href = frontend_domain + '/storyapp.html';
//      //console.log(response);
//    }.bind(this));
//
// }

//    //====================================
//    //----Storyteller: Initializing Var----
//    //====================================
//
//    this.storyteller = '';
//    this.createStorytellerMessage = '';
//    this.registerErrorMsg = "missing required field(s)"
//    this.username = '';
//    this.password = '';
//    this.email = '';
//    this.img = '';
//    this.name = '';
//    this.storytellers = [];
//    this.isLoggedIn = false;
//    this.isRegistered = true
//
//    //=====================================
//    //----Storyteller: Get Storytellers----
//    //=====================================
//    this.getStorytellers = function() {
//
//      $http({ // Makes HTTP request to server
//        method: 'GET',
//        url: backend_domain + '/players/',
//        headers: {
//          Authorization: 'Bearer' + JSON.parse(localStorage.getItem('token'))
//        }
//      }).then(function(response) {
//        if(response.data.status == 401) {
//          this.error = "Unauthorized";
//        } else {
//          this.storytellers = resonse.data;
//        }
//      }.bind(this));
//    };
//
//    //=======================================
//    //----Storyteller: Create Storyteller----
//    //=======================================
//    this.createStoryteller = function(){
//
//   console.log('create new player');
//   // console.log(this.username);
//   // console.log(this.password);
//   // console.log(this.name);
//   // console.log(this.email);
//   // console.log(this.img);
//     if((this.username == '') ||
//        (this.username == 'undefined')||
//        (this.name == '') ||
//        (this.name == 'undefined') ||
//        (this.password == '') ||
//        (this.password == 'undefined')){
//        this.isRegistered = false;
//        this.createStorytellerMessage = "Your registration is incomplete";
//        return;
//     }
//
//      $http({ // Makes HTTP request to server
//        method: 'POST',
//        url: backend_domain + '/storytellers',
//        data: { // Gets turned into req.body
//          username: this.username,
//          name: this.name,
//          img: this.img,
//          password: this.password,
//          email: this.email,
//        }
//      }).then(function(response) {
//        console.log(response);
//        if(response.status == 201)
//        {
//           window.location.href = frontend_domain; //"http://localhost:8000";
//        }
//    });
//
//    //===================================
//    //----Storyteller: Function Login----
//    //===================================
//    this.loginStoryteller = function(userPass) {
//       console.log(userPass);
//      this.appPage = frontend_domain + '/storyapp.html';
//      if ((userPass == 'undefined') ||
//          (userPass.username == null) ||
//          (userPass.username == '') ||
//          (userPass.username == 'undefined') ||
//          (userPass.password == '') ||
//          (userPass.password == 'undefined') ||
//          (userPass.password == null)){
//             window.location.href = frontend_domain;
//             this.logInMessage = 'Invalid Login Attempt, please try again.'
//             return;
//      }
//
//      $http({ // Makes HTTP request to server
//        method: 'POST',
//        // url: this.domainurl1 + '/players/login',
//        url: backend_domain + '/players/login',
//        data: {
//          player: { // Gets turned into req.body
//            username: userPass.username,
//            password: userPass.password
//          }
//        }
//      }).then(function(response) {
//        console.log(response);
//        if(response.data.token){
//          console.log("Logged in");
//          this.storyteller = response.data.storyteller;
//          localStorage.setItem('token', JSON.stringify(response.data.token));
//          localStorage.setItem('storytellerId', this.storyteller.id);
//          window.location.href = this.appPage;
//          // console.log(JSON.parse(localStorage.getItem('token')));
//          this.isLoggedIn = true;
//        }
//        else if(response.data.token == 'undefined'){
//          window.location.href = frontend_domain;
//          this.logInMessage = 'Invalid Login Attempt, please try again.'
//        }
//      }.bind(this));
//    };
//
//    //====================================
//    //----Storyteller: Function Logout----
//    //====================================
//    this.logout = function(){
//      localStorage.clear('token');
//      window.location.href = frontend_domain;
//      //location.reload();
//    };
//
