$(function () {
    var APPLICATION_ID = "8D2F6914-3D1D-ACBA-FF2C-A7F8F2713600",
            SECRET_KEY = "5FE4E5F0-F1A9-8E8E-FFC8-C5A297A22A00",
            VERSION = "v1";

    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

  var postsCollection = Backendless.Persistence.of(Posts);
    
    console.log(postsCollection);
    var currentUser = Backendless.UserService.getCurrentUser();
    if(currentUser !== null) {
   
        var everythingTasks = postsCollection.find();
        var wrapper = {
        posts: everythingTasks.data
    };
    }
    Handlebars.registerHelper('format', function (time) {
        return moment(time).format("dddd, MMMM Do YYYY");
    });
    
   var blogScript = $("#blogs-template").html();
   var blogTemplate = Handlebars.compile(blogScript);
   var blogHTML = blogTemplate(wrapper);
   
   $('.main-container').html(blogHTML);
   
    $(document).on('click', '.white-out-post', function () {
   var CheckListScript = $("#check-done-template").html();
   var CheckListTemplate = Handlebars.compile(CheckListScript);
   $('.main-container').html(CheckListTemplate);
   console.log("Complete Post");
   
  });
   
   $(document).on('click', '.purple-out-post', function () {
   var UncheckScript = $("#check-done-template").html();
   var UncheckTemplate = Handlebars.compile(UncheckScript);
   $('.main-container').html(UncheckTemplate);
});

    $(document).on('click', '.delete-post', function () {
        
        Backendless.Persistence.of(Posts).remove("8EADB136-471D-719F-FF0E-FA204546BA00");
    });

function Posts(args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}
});

