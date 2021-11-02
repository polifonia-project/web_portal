document.addEventListener("DOMContentLoaded", function(event) {

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
  $("#search").empty();
  if (selection.length) {
    $.getJSON({
        url: "/index",
        data: { "data": selection },
        success: function (result) {
          console.log(result);
          for (i = 0; i < result.length; i++) {
            if (result[i].type.length) {var type = result[i].type} else {var type = 'something'};
            $("#search").append("<p class='col-md-12 col-sm-12'><span class='res_type col-md-3 col-sm-3'>"+type+"</span><a class='col-md-8 col-sm-8' href='resource/"+result[i].uri+"'>"+result[i].label+"</a></p>");
          }
        }

    });
  } else {$("#search").empty();}

}
