document.addEventListener("DOMContentLoaded", function(event) {
  // SEARCH RESULTS
  $("#search").hide();

  // CHANGE HEADER ON SCROLLING
  var equaliser = document.getElementById("equaliser");
  $(window).scroll(function(){
    if (equaliser != null) {
      // move back to body if scroll top
      var scrolltop = $(window).scrollTop();
      if (scrolltop == 0) {
        var menu_equaliser = $("#equaliser");
        $("#equaliser").detach();
        menu_equaliser.appendTo("#equaliser_container");
        $(".equaliser").css('color','white');
        $(".equaliser").css('margin-top','5em');
        $("#header").css('background','black');
        $("#header").css('height','3rem');
        $("body, .main_bg").css("background","black");
      } else {

        $.doTimeout( 'scrollTop', 50, function(){
          // move equaliser to the menu if scroll down
           var menu_equaliser = $("#equaliser");
           $("#equaliser").detach();
           $("#header").css('background','white');
           $("#header").css('height','20em');
           menu_equaliser.appendTo("#header");
           $("#header .equaliser").css('color','black');
           $("#header .equaliser").css('margin-top','-5em');
           $("body, .main_bg").css("background","white");

          // add sections based on equaliser

          });
      }
    }

  });



  // NAVBAR
  const showNavbar = (toggleId, navId, bodyId, headerId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId),
  bodypd = document.getElementById(bodyId),
  headerpd = document.getElementById(headerId)

  // Validate that all variables exist
  if(toggle && nav && bodypd && headerpd){
    toggle.addEventListener('click', ()=>{
      // show navbar
      nav.classList.toggle('show')
      // change icon
      toggle.classList.toggle('bx-x')
      // add padding to body
      bodypd.classList.toggle('body-pd')
      // add padding to header
      headerpd.classList.toggle('body-pd')
    })
  }
  }

  showNavbar('header-toggle','nav-bar','body-pd','header')

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll('.nav_link')

  function colorLink(){
    if(linkColor){
      linkColor.forEach(l=> l.classList.remove('active'))
      this.classList.add('active')
    }
  }
  linkColor.forEach(l=> l.addEventListener('click', colorLink))

});


// callback function - query sonic index
function call_index(selection) {
  $("#search").show();
  $("#search").empty();

  if (selection.length) {
    var is_empty = true;
    $.getJSON({
        url: "/index",
        data: { "data": selection },
        success: function (result) {
          if (result.length) {
            for (i = 0; i < result.length; i++) {
              if (result[i].type.length) {var type = result[i].type} else {var type = 'something'};
              $("#search").append("<p class='col-md-12 col-sm-12'><span class='res_type col-md-3 col-sm-3'>"+type+"</span><a class='col-md-8 col-sm-8' href='resource/"+result[i].uri+"'>"+result[i].label+"</a></p>");
            }
          } else {$("#search").append("<p>no results</p>")};

        }
    });
  } else {$("#search").empty();$("#search").hide();}

}

// show section on input change
function showSection(num) {
  console.log(num);
}
