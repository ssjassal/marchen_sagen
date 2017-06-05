# Marchen & Sagen - Community Story Building

Based off a childhood game usually during summer camps. Marchen & Sagen is a community based story building site.  It's an opportunity for creative minds to come together and build a story. This site is an Ruby on Rails & Angular based site with a CRUD feature for the snippets.

## Getting Started

These instructions will help you play the game should you not wish to download a copy of the project. **You can access the game on my live site here: [Marchen & Sagen](https://marchen-sagen-app.herokuapp.com/)**


Should you want to see the code and modify, these instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. Please clone my repository for Project_1 from there you will find the index.html file which you can open in your browser and launch the game.  To make modifications of your own, the app.js file is located in the js folder with Project_1. **You can access the frontend respository here: [Marchen & Sagen Frontend](https://github.com/ssjassal/marchen_sagen_frontend) and the backend repository here: [Marchen & Sagen Backend](https://github.com/ssjassal/marchen_sagen_api)**


### Prerequisites

For normal viewing without a copy of the project you will need the following:

```
1. Working Browser(IE, Chrome, Mozilla, Firefox)
```

For game play while having a copy of the project for development you will the following:
```
1. Sublime Text or Atom (A text editor)
2. Github repository
3. Terminal prompt to work with Github 
4. Working Browser(IE, Chrome, Mozilla, Firefox)
5. Some knowledge of JavaScript, Jquery, HTML, CSS
6. Angularjs
7. Ruby on Rails
8. Express
```
### Installing

Here are the steps to get a development environment up and running

1. Create a local development folder on your computer.
2. Go to github.com to create a Github profile and repository.
   Instructions can be found here: [Getting a Git Repository](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
3. Configure your github profile in Terminal. 
   Instructions can be found here: [Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
4. Clone the wdir-projects repository above
5. Pull the wdir-projects folder into your local folder.
6. Open wdir-projects folder with your text editor
7. Open the index.html and open in browser
8. Open app.js and style.css to make further modifications
9. Save and add, commit, and push to your Github repository
   Instructions can be found here: [Recording Changes to a Git Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
10. Install Angular
11. Install Ruby on Rails
12. Install Express

## Unsolved Problems

This game had two unsolved problems

* JWT
* Create Story - Images and Author

### JWT
The user authentication was not a smooth integration.  Once installed I was able to create a user and login a user through Postman testing services. However when connecting with the frontend I would run into error, that were difficult to understand.


The Create route would work through through the Postman service however when creating through the frontend the img and author elements would not update while the remaining pieces of the object would update (i.e. title, content).  

### Create Story - Images and Author

```
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
```

## Built With

* [JavaScript](https://www.javascript.com/) - Language Used
* [JQuery](https://jquery.com/) - Language Used
* [Sublime Text](https://www.sublimetext.com/) - Text Editor
* [Apple Terminal](https://en.wikipedia.org/wiki/Terminal_(macOS)) - Access to the Github Repository
* [Google Chrome](https://www.google.com/chrome/) - Used to display game
* [Github](https://github.com/) - Repository
* [Angular](https://angularjs.org/)
* [Ruby on Rails](http://rubyonrails.org/)
* [Express](https://expressjs.com/)

## Authors

* **Soniya Jassal** - *Initial work* - [SSJassal](https://github.com/ssjassal)
