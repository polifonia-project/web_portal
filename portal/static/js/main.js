
var firstScroll = false;

document.addEventListener("DOMContentLoaded", function(event) {
  // SEARCH RESULTS
  $("#search").hide();

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
  const linkColor = document.querySelectorAll('.nav_link')

  function colorLink(){
    if(linkColor){
      linkColor.forEach(l=> l.classList.remove('active'))
      this.classList.add('active')
    }
  }
  linkColor.forEach(l=> l.addEventListener('click', colorLink))

  // CHANGE HEADER ON SCROLLING
  var equaliser = document.getElementById("equaliser");

  $(window).scroll(function(){
    if (equaliser != null) {
      // move back to body if scroll top
      var scrolltop = $(window).scrollTop();
      if (scrolltop <= 49) {
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

           // READ PREFERENCES
           var sections = init_equaliser(".eq input");
           var sorted_sections = []
           for (var s in sections) { sorted_sections.push([s, sections[s]]); }
           sorted_sections.sort(function(a, b) { return b[1] - a[1]; });

          // LOAD SECTIONS ON SCROLL
          // BUILD SECTIONS AT FIRST SCROLL
          if (isScrolledIntoView('#maincontent') && !firstScroll) {
              load_sections_first_time(sorted_sections);
          }
          // FOLLOWING TIMES
          else if (isScrolledIntoView('#maincontent') && firstScroll) {
            // update equaliser object
            // if changed
          } else {  };
          });
      }
    }

  });

  // update equaliser on change
  // $(".eq input").change(function() {
  //   var iname = $(this).attr('id');
  //   var num = $(this).val();
  //   sections[iname] = num;
  // });




});

function load_sections_first_time(sorted_sections) {
    firstScroll = true;
    for (i = 0; i < sorted_sections.length; i++) {
      var section_id = sorted_sections[i][0]
      var section_title = $("#"+section_id).next().text();
      var sec = category_section(section_id,section_title,sorted_sections[i][1]);
      $("#maincontent").append(sec);
      // if section does not exist, create it
      // if (document.getElementById("section_"+sorted_sections[i][0]) == null) {
      //
      // } else {
      //   // otherwise update contents
      //   document.getElementById("section_"+section_id+".counter").textContent=sorted_sections[i][1]
      //   // and reorder
      // }
    }
}

function category_section(section_id, section_title, counter) {
  var s = "<section class='row category_section justify-content-md-center' id='section_"+section_id+"'>\
        <section class='row col-md-10 col-sm-10'>\
          <h2 class='category_title col-md-3 col-sm-6'>"+section_title+"</h2>\
          <p class='col-md-3 col-sm-6' id='section_"+section_id+"_counter' data-counter='"+counter+"'>"+counter+"</p>"
  c = parseInt(counter)
  if (c > 0) {
    for (i = 0 ; i < parseInt(c/10); i++ ) {
      s += "<p class='col-md-5 col-sm-6'>"+c[i]+"</p>"
    }
  }

  s += "</section></section>"
  return s
}

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

// create object section : value equaliser
function init_equaliser(idx) {
  var sections = {};
  var inputs = $(idx);
  inputs.each(function () {
    var iname = $(this).attr('id');
    var num = $(this).val();
    sections[iname] = num;
  });
  return sections
}

// check if user has scrolled till a certain element
function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();
  return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
}

// show section on input change
function showSection(num, name) {
  // get an updated sections object
  var sections = init_equaliser(".eq input");
  sections[name] = num;

  // create array to sort sections in descending order
  var sorted_sections = []
  for (var s in sections) { sorted_sections.push([s, sections[s]]); }
  sorted_sections.sort(function(a, b) { return b[1] - a[1]; });

  for (i = 0; i < sorted_sections.length; i++) {
    var section_id = sorted_sections[i][0]
    var section_title = $("#"+section_id).next().text();
    // if section does not exist, create it
    if (document.getElementById("section_"+sorted_sections[i][0]) == null) {
      sec = category_section(section_id,section_title,sorted_sections[i][1]);
      $("#maincontent").append(sec);
    } else {
      // update contents

      $("#section_"+section_id+"_counter").attr('data-counter',sorted_sections[i][1]);
      console.log($("#section_"+section_id+"_counter"));
      // and reorder
    }

  }
  // query config file for datasets in the category
  // get the api for queries

  // else create it
  // return a number of results proportional to the value in the equaliser
}
