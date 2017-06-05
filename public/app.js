
console.clear();

//================================
//-----API Domains Dev & Prod-----
//================================
// var frontend_domain = "http://localhost:8000";
// var backend_domain = "http://localhost:3000";
var frontend_domain = 'https://marchen-sagen-app.herokuapp.com/';
var backend_domain = 'https://marchen-sagen-api.herokuapp.com/';
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

   //===============================
   //----Story: Initializing Var----
   //===============================
   this.storyCategory = '';
   this.date_created = '';
   this.title = '';
   this.img = '';
   this.content = '';
   this.description = '';
   this.storyContent = '';
   this.story_id = '';
   this.storyteller_id = '';
   this.storytellerID = '';
   this.snippet = '';
   this.index = '';
   this.mergedContent = '';
   this.storyTitle = '';
   this.storyDescription = '';
   this.storyImg = '';
   this.storyStory = '';
   this.viewStoryIndex = '';
   this.newIndex = '';
   this.updateItemId ='';
   this.storyteller ='';
   this.storytellers = [];
   this.mergedContentArray = [];
   this.categories = [];
   this.snippets = [];
   this.recentSnippets = [];
   this.stories = [];
   this.snippetTitle = [];
   this.allSnippetsTitle =[];
   this.category = [];
   this.updateItem = {};
   this.deleteItem = {};
   this.createStory = false;
   this.recentSnippet = false;
   this.allStories = false;
   this.addSnippet = false;
   this.viewStory = false;

   //=====================================
   //----Storyteller: Initializing Var----
   //=====================================

   this.author = {};
   this.userPass = {};
   this.tale = {};
   this.storyteller = '';
   this.username = '';

   //==============================
   //----Story: Get All Stories----
   //==============================
   $http({
     method: 'GET',
     url: backend_domain + 'stories'//,
   //   headers: {
   //      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
   //    }
   }).then(function(result){
   //   var today = new Date();
   //   var date = today.getFullYear() + '-' + (today.getMonth() + 1 ) + '-' + today.getDate() + 'T';
   //   var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
   //  console.log('Stories: ', result);
     this.stories = result.data.reverse();
     //console.log(this.addSnippet);
   //   localStorage.setItem('', this.stories);
     this.categories = result.data;
     this.mergeSnippetToStory();
     this.setRecentSnippetTitle();
     this.viewStory = false;
     //console.log('Recent Snippets: ',this.recentSnippets);
   }.bind(this));

   //===============================
   //----Story: Get All Snippets----
   //===============================
   $http({
     method: 'GET',
     url: backend_domain + 'snippets'//,
   //   headers: {
   //      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
   //    }
   }).then(function(result){
    // console.log('Snippets: ',result.data);
   //   console.log(JSON.parse(localStorage.getItem('stories')));
     this.snippets = result.data;
     //console.log(this.storyteller);
     this.viewStory = false;
   }.bind(this));

   //====================================
   //---Story: Function Create Stories---
   //====================================
   this.newStory = function(tale){
      //console.log('LOCAL: ', localStorage.getItem('Storyteller username'));
      //console.log('this.storyteller', this.storyteller);
      //console.log(tale.image);
      // tale.title = tale.title.toString();
      // tale.author = tale.author.toString();
      // tale.image = tale.image.toString();
      $http({ // Makes HTTP request to server
        method: 'POST',
        url: backend_domain + 'stories',
        data: {
          story: { // Gets turned into req.body
           title: tale.title,
           author: this.storyteller.toString(),
           description: tale.description,
           content: tale.content,
           category: tale.category,
           img: tale.image.toString()
          }
       }//,
      //  headers: {
      //   Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      // }
      }).then(function(response) {
         console.log(response);
         $http({
           method: 'GET',
           url: backend_domain + 'stories'//,
         //   headers: {
         //      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
         //    }
         }).then(function(result){
         //   var today = new Date();
         //   var date = today.getFullYear() + '-' + (today.getMonth() + 1 ) + '-' + today.getDate() + 'T';
         //   var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
           console.log('Stories: ', result);
           this.stories = result.data.reverse();
           //console.log(this.addSnippet);
         //   localStorage.setItem('', this.stories);
           this.categories = result.data;
           this.mergeSnippetToStory();
           this.setRecentSnippetTitle();
           this.viewStory = false;
           //console.log('Recent Snippets: ',this.recentSnippets);
         }.bind(this));
         //window.location.href = frontend_domain + '/storyapp.html';
      }.bind(this));
   };

   //===========================================
   //----Story: Function Create New Snippets----
   //===========================================
   this.newSnippet = function(){
      // console.log(this.index);
      // console.log(this.stories[this.index].id);
      if(this.viewStoryIndex !== ''){
         this.story_id = this.stories[this.viewStoryIndex].id;
         // this.newIndex = this.viewStoryIndex;
      }else{
         this.story_id = this.stories[this.index].id;
         // this.newIndex = this.index;
      }
      this.snippet = this.snippet.toString();
      //console.log(this.snippet);
      // console.log(this.stories[index].id);
      // this.storyteller_id = this.storytellers //need storyteller id passed
      $http({ // Makes HTTP request to server
        method: 'POST',
        url: backend_domain + 'snippets',
        data: {
          snippet: { // Gets turned into req.body
           story_id: this.story_id,
           snip: this.snippet,
           storyteller_id: 2
          }
       }//,
      //  headers: {
      //   Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      // }
      }).then(function(response) {
         // this.viewStory(this.newIndex)
         window.location.href = frontend_domain + 'storyapp.html';
        //console.log(response);
      }.bind(this));
   };

   //=========================================
   //---Story: Function Merge Snippet Story---
   //=========================================
   this.mergeSnippetToStory = function(){
      //console.log(this.stories);
      //console.log('Merge Snippet');
      for (var i = 0; i < this.stories.length; i++) {
         this.mergedContent = this.stories[i].content;
         //console.log('Merged Content: ' + this.mergedContent);
         if(this.stories[i].snippets.length !== 0){
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
   };

   //==============================================
   //---Story: Function Set Recent Snippet Title---
   //==============================================
   this.setRecentSnippetTitle = function(){
      //console.log('This.SnippetsInFunction: ',this.snippets);
    //   this.setSnippetTitle();
      //console.log('This.Stories: ', this.stories);
      //CHECK FOR THIS.SNIPPETS.LENGTH IS LESS THAN 6-Need to verify
      if (this.snippets.length >= 6){
         for (var i = this.snippets.length - 1; i > (this.snippets.length - 6) ; i--) {
               // console.log('i: ', i);
               //console.log('Snippets: ', this.snippets[i]);
                this.recentSnippets.push(this.snippets[i]);
                this.recentSnippets = this.recentSnippets.reverse();
               // console.log('Recent Snip: ', this.recentSnippets);
               // console.log('Recent Snip: ', this.recentSnippets[]);
         }
      }else{
         for (var j = 0 ; j <= this.snippets.length-1 ; j++) {
               //console.log('j: ', j);
               // console.log('Snippets: ', this.snippets[j]);
                this.recentSnippets.push(this.snippets[j]);
                this.recentSnippets = this.recentSnippets.reverse();
               //console.log('Recent Snip<6: ', this.recentSnippets);
               // console.log('Recent Snip: ', this.recentSnippets[]);
         }
      }
      for (var k = 0; k < this.recentSnippets.length; k++) {
          //console.log('In FOR loop', k);
          for (var l = 0; l < this.stories.length; l++) {
             //console.log('In second FOR loop', j);
            // console.log('Recent Snippet Story ID ', this.recentSnippets[k].title );
            // console.log('Stories Story ID ', this.stories[l].id);
             //console.log('Recent Snippet of k ', this.recentSnippets[k].story_id );
             if (this.recentSnippets[k].story_id === this.stories[l].id){
                // console.log('In IF statement [k], [l], storytitle', k,l,this.stories[l].title);
                 this.snippetTitle.push(this.stories[l].title);
                 //console.log('Snippet Title after push: ',this.snippetTitle);
             }
          }
       }
   };

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
      this.viewStory = false;
   };

   //==========================================
   //---Story: Function Display All Snippets---
   //==========================================
   this.displaySnippets = function(){
      //console.log('Snips: ',this.snippets);
      //console.log('Stories: ', this.stories);;
      this.viewStory = false;
      this.snippets = this.snippets.reverse();
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
   };

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
      this.content = this.mergedContentArray[index];
      // this.addSnippet = true;
      //console.log(this.addSnippet);
      this.allStories = true;
      this.viewStory = false;
   };

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
      //console.log('Merged Array of Index: ',this.mergedContentArray[this.viewStoryIndex]);
      this.content = this.mergedContentArray[this.viewStoryIndex];
      // this.addSnippet = true;
      //console.log(this.addSnippet);
      this.allStories = true;
      this.viewStory = false;
   };

   //============================================
   //---Story: Function Display Update Snippet---
   //============================================
   this.findUpdateSnippet = function(updateIndex){
      this.updateItem = this.snippets[updateIndex];
      this.updateItemId = this.updateItem.id;

      this.snippet = this.updateItem.snip;
      this.title = this.allSnippetsTitle[updateIndex];
      this.viewStory = false;
      // this.title = this.stories[updateIndex].title;
      // this.description = this.stories[updateIndex].description;
      // this.storyCategory = this.stories[updateIndex].category;
      // this.img = this.stories[updateIndex].img;
      // this.content = this.mergedContentArray[updateIndex];
   };
   //=========================================
   //---Story: Function Update Snippet---
   //=========================================
   this.updateSnippet = function(){
      // this.updateItem = this.snippets[updateIndex];
      // this.updateItemId = this.updateItem.id;
      //this.storyteller = localStorage.getItem('Storyteller username');
      // console.log('index: ',index);
      // console.log('SnipID:',this.updateItemId);
      // console.log('StoryID: ',this.story_id);
      // console.log('Snip: ',this.snippet);
      // console.log('Storyteller ID: ', this.storytellerID);
      //NEED TO ADD STORYTELLER ID
      $http({ // Makes HTTP request to server
        method: 'PUT',
        url: backend_domain + 'snippets/' + this.updateItemId,
        data: {
          snippet: { // Gets turned into req.body
           snip: this.snippet
         //   storyteller_id: this.storytellerID
          }
       }//,
      //  headers: {
      //   Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      // }
      }).then(function(response) {
         // this.viewStory(this.newIndex)
         this.viewStory = false;
         window.location.href = frontend_domain + 'storyapp.html';
        //console.log(response);
      }.bind(this));
      // this.title = this.stories[updateIndex].title;
      // this.description = this.stories[updateIndex].description;
      // this.storyCategory = this.stories[updateIndex].category;
      // this.img = this.stories[updateIndex].img;
      // this.content = this.mergedContentArray[updateIndex];
   };

   //====================================
   //---Story: Function Delete Snippet---
   //====================================
   this.deleteSnippet = function(index){
      //console.log(this.snippets[index]);
      $http({ // Makes HTTP request to server
        method: 'DELETE',
        url: backend_domain + 'snippets/' + this.snippets[index].id,
        data: {
          snippet: this.snippets[index].id
        }
      //,
      //  headers: {
      //   Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      // }
      }).then(function(response) {
         // this.viewStory(this.newIndex)
         this.viewStory = false;
        window.location.href = frontend_domain + 'storyapp.html';
        //console.log(response);
      }.bind(this));
   };
   //=========================================
   //---Story: Function Return to Home Page---
   //=========================================
   this.goHome = function(){
      this.recentSnippet = false;  //show
      this.allStories = false; //hide
      this.createStory = false;
      this.viewStory = false;
      this.index = '';
      this.viewStoryIndex = '';
   };

   //======================================
   //---Story: Function Create New Story---
   //======================================
   this.createStories = function(){
      this.createStory = true;
      this.allStories = true;
      this.recentSnippet = false; //show form
      this.viewStory = false;
   };

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
      if(this.stories[index].snippets.length !== 0){
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
   };

   //====================================
   //----Storyteller: Function Logout----
   //====================================
      this.logout = function(){
        localStorage.clear('Storyteller username');
        window.location.href = frontend_domain;
        //location.reload();
      };



   //===================================
   //----Storyteller: Function Enter----
   //===================================
   this.enterStoryteller = function(userPass) {
      // console.log(userPass);
      this.username = userPass.username.toString();

      //console.log(this.storyteller);
      $http({ // Makes HTTP request to server
        method: 'POST',
        url: backend_domain + 'storytellers',
        data: { // Gets turned into req.body
           storyteller: {
             username: this.username,
           }
        }
      }).then(function(response) {
        //console.log('Added username: ',response);
        if(response.status == 201)
        {
           //console.log('in 201 message');
           localStorage.setItem('Storyteller username', this.username);
           this.storyteller = localStorage.getItem('Storyteller username');
           //console.log(this.storyteller);
           $http({
             method: 'GET',
             url: backend_domain + 'storytellers'//,
           //   headers: {
           //      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
           //    }
           }).then(function(result){
             //console.log('Storytellers: ', result);
             this.storytellers = result.data;
             //console.log(this.storytellers);
             for (var o = 0; o < this.storytellers.length; o++) {
                //console.log('storyteller: ', this.storyteller);
                if(this.storyteller === this.storytellers[o].username)
                {
                   this.storytellerID = this.storytellers[o].id;
                   //console.log('ID: ', this.storytellerID);
                }
             }
            window.location.href = frontend_domain + 'storyapp.html';
           }.bind(this));
           //this.author = response.data.storyteller;
        }
        //window.location.href = frontend_domain; //"http://localhost:8000";

    }.bind(this));
      //console.log(this.storyteller);

      // this.password = userPass.password.toString();
      //this.appPage = frontend_domain + '/storyapp.html';
   //   if ((userPass == 'undefined') ||
   //       (userPass.username == null) ||
   //       (userPass.username == '') ||
   //       (userPass.username == 'undefined') ||
   //       (userPass.password == '') ||
   //       (userPass.password == 'undefined') ||
   //       (userPass.password == null)){
   //          window.location.href = frontend_domain;
   //          this.logInMessage = 'Invalid Login Attempt, please try again.'
   //          return;
   //   }

   //   $http({ // Makes HTTP request to server
   //     method: 'POST',
   //     // url: this.domainurl1 + '/players/login',
   //     url: backend_domain + '/storytellers/login',
   //     data: {
   //       storyteller: { // Gets turned into req.body
   //         username: this.username,
   //         password: this.password
   //       }
   //     }
   //   }).then(function(response) {
   //     console.log(response);
   //     if(response.data.status == 401){
   //       window.location.href = frontend_domain;
   //       this.logInMessage = 'Invalid Login Attempt, please try again.';
   //    }else
   //    {
   //       console.log("Logged in");
   //       localStorage.clear('token');
   //       this.storyteller = response.data.storyteller;
   //       localStorage.setItem('token', JSON.stringify(response.data.token));
   //       // localStorage.setItem('storytellerId', this.storyteller.id);
   //       window.location.href = this.appPage;
   //       // console.log(JSON.parse(localStorage.getItem('token')));
   //       // this.isLoggedIn = true;
   //     }
   //   }.bind(this));
   };

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
// //=======================================
// //----Storyteller: Create Storyteller----
// //=======================================
// this.createStoryteller = function(author){
//
// //   console.log('create new storyteller');
// //   console.log(author.username);
// //   console.log(author.password);
// //   console.log(author.name);
// //   // console.log(this.email);
// //   // console.log(this.img);
// //    //  if((this.username == '') ||
// //    //     (this.username == 'undefined')||
// //    //     (this.name == '') ||
// //    //     (this.name == 'undefined') ||
// //    //     (this.password == '') ||
// //    //     (this.password == 'undefined')){
// //    //     this.isRegistered = false;
// //    //     this.createStorytellerMessage = "Your registration is incomplete";
// //    //     return;
// //    //  }
//
//      $http({ // Makes HTTP request to server
//        method: 'POST',
//        url: backend_domain + '/storytellers',
//        data: { // Gets turned into req.body
//           storyteller: {
//             username: author.username,
//             name: author.name,
//             img: author.img,
//             password: author.password,
//             email: author.email
//           }
//        }
//      }).then(function(response) {
//        console.log(response);
//        if(response.status == 201)
//        {
//           this.author = response.data.storyteller;
//           window.location.href = frontend_domain; //"http://localhost:8000";
//        }
//    }.bind(this));
// };
