$(function () {
    var APPLICATION_ID = "8D2F6914-3D1D-ACBA-FF2C-A7F8F2713600",
            SECRET_KEY = "5FE4E5F0-F1A9-8E8E-FFC8-C5A297A22A00",
            VERSION = "v1";

    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
     if(Backendless.UserService.isValidLogin()) {
       userLoggedIn(Backendless.LocalCache.get("current-user-id"));
   } else {
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
   }
     
   $(document).on('submit', '.form-signin', function(event) {
       event.preventDefault();
       
       var data = $(this).serializeArray(),
           email = data[0].value,
           password = data[1].value;
           
       Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, getError));
   });
    $(document).on('click', '.add-blog', function() {
       var addBlogScript = $('#add-blog-template').html();
       var addBlogTemplate = Handlebars.compile(addBlogScript);
       
        $('.main-container').html(addBlogTemplate);
    });
    
   $(document).on('click', '.form-add-blog', function() {
       event.preventDefault();
       
       var x;
       x = document.getElementById("title").value;
       var y;
       y = document.getElementById("content").value;
       if(x == "") {
           Materialize.toast('No Title', 4000)
           return false;
       }
       if(y == "") {
           Materialize.toast('No Content', 4000)
           return false;
       }
    
     var data = $(this).serializeArray(),
       title = data[0].value,
       content = data[1].value;
       
     var dataStore = Backendless.Persistence.of(Posts);
       
     var postObject = new Posts ({
         title: title,
         content: content,
         authorEmail: Backendless.UserService.getCurrentUser().email,
         completed: false
       });
       dataStore.save(postObject);
       
       this.title.value = "";
       this.content.value = "";
   });
});

function Posts(args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
     this.completed = args.completed || false;
}
 $(document).on('click', '.logout', function () {
        Backendless.UserService.logout(new Backendless.Async(userLoggedOut, getError))
        
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
    });

function userLoggedIn(user) {
    console.log("user successfully logged in");
    var  userData;
    if(typeof user == "string") {
        userData = Backendless.Data.of(Backendless.User).findById(user);
    } else {
        userData  = user;
    }
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(userData);
    
    $('.main-container').html(welcomeHTML);
}

function userLoggedOut () {
    console.log("successfully logged out");
}

function getError(error) {
    console.log("Error message - " + error.message);
    console.log("Error code - " + error.code);
    Materialize.toast('Incorrect username or password', 4000);
}
