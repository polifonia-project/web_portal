RECOMMEND_SUFFIX = '/recommend/';

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
  var firstScroll;

  // INVERT COLOR ICON TOGGLE MENU
  var element = document.getElementById("open_menu");
  var filter = 'grayscale(1) invert(1)';
  element.style['-webkit-filter'] = filter;
  element.style['filter'] = filter;

  // HOMEPAGE BEHAVIOUR: MENU AND EQUALISER
  $(window).scroll(function(){
    if (equaliser != null) {
      var scrolltop = $(window).scrollTop();
      // move back equaliser to body if the user scrolls top
      if (scrolltop <= 49) {
        var menu_equaliser = $("#equaliser");
        var home_logo = $("#home_logo");
        $("#home_logo").detach();
        $("#equaliser").detach();
        home_logo.appendTo("#equaliser_container");
        menu_equaliser.appendTo("#equaliser_container");
        $(".equaliser").css('color','white');
        $(".equaliser").css('margin-top','5em');
        $("#header").css('background','black');
        $("#header").css('height','3rem');
        $("body, .main_bg").css("background","black");
        var element = document.getElementById("open_menu");
        var filter = 'grayscale(1) invert(1)';
        element.style['-webkit-filter'] = filter;
        element.style['filter'] = filter;
      } else {
        // move the equaliser to the menu if the user scrolls down
         var menu_equaliser = $("#equaliser");
         $("#home_logo").detach();
         $("#equaliser").detach();
         $("#header").css('background','white');
         $("#header").css('height','20em');
         menu_equaliser.appendTo("#header");
         $("#header .equaliser").css('color','black');
         $("#header .equaliser").css('margin-top','-5em');
         $("body, .main_bg").css("background","white");
         var element = document.getElementById("open_menu");
         var filter = 'grayscale(1) invert(0)';
         element.style['-webkit-filter'] = filter;
         element.style['filter'] = filter;
         // READ PREFERENCES FROM EQUALISER
         var sections = init_equaliser(".eq input");
         var sorted_sections = []
         for (var s in sections) { sorted_sections.push([s, sections[s]]); }
         sorted_sections.sort(function(a, b) { return b[1] - a[1]; });

        // LOAD SECTIONS ON SCROLL
        // BUILD SECTIONS AT FIRST SCROLL
        if (isScrolledIntoView('#maincontent') && !firstScroll) {
            load_sections_first_time(sorted_sections);
            firstScroll = true;

        }
        // FOLLOWING TIMES
        //else if (isScrolledIntoView('#maincontent') && firstScroll) {
          // update equaliser object if changed
        //} else {  };


        // $.doTimeout( 'scrollTop', 50, function(){
        //
        // });

      }
    }

  });

});

// loads sections the first time the user scrolls down
function load_sections_first_time(sorted_sections) {
    var secs = "";
    for (i = 0; i < sorted_sections.length; i++) {
      var section_id = sorted_sections[i][0];
      var section_title = $("#"+section_id).next().text();
      var counter = sorted_sections[i][1];
      // if the user has not user the equaliser
      if (document.getElementById("section_"+sorted_sections[i][0]) == undefined) {
        add_section(section_id,section_title,counter);
      }
    }
}

// create section, call apis
function add_section(section_id,section_title,counter){
  sec = category_section(section_id,section_title,counter);

  c = parseInt(counter);
  n_res = parseInt(c/10);
  if (n_res >= 1) { $("#maincontent").append(sec); add_resources(section_id, n_res)};
}

function category_section(section_id, section_title, counter) {
  c = parseInt(counter);
  n_res = parseInt(c/10);

  var s = "<section class='row col-md-10 col-sm-10 category_section justify-content-md-center' id='section_"+section_id+"'>\
            <section class='col-md-4 col-sm-4'>\
                <h2 class='category_title row col-md-12 col-sm-12'>"+section_title+"</h2>\
                <p class='col-md-12 col-sm-12' id='section_"+section_id+"_counter' data-counter='"+n_res+"'>"+n_res+"</p>\
            </section>\
            <section class='resources col-md-6 col-sm-6 right'>\
            </section>\
          </section>";
  return s
}

// add resources to category_section the first time these are shown
function add_resources(section_id, n_res) {
  // get data sources apis for a category from config file
  var api_list = get_apis_for_category(section_id,n_res);
  if (api_list.length) {
    for (i=0; i < api_list.length; i++) {
      // return paragraphs to be appended to category_section
      call_apis(section_id, api_list[i]);
    }
  }
}

// perform an api call specified in input and append results to section#id
function call_apis(section_id, api) {
  $.getJSON({
      url: api,
      success: function (result) {
        if (result.length) {
          for (i = 0; i < result.length; i++) {
            var res = category_resource(result[i].uri, result[i].label, result[i].type);
            $("#section_"+section_id+" .resources").append(res);
          }
        }
      }
  });
}

// resource template in homepage
function category_resource(uri, label, type='Resource') {
  var res = "<section class='resource col-md-12 col-sm-12'>\
      <h3 class='col-md-8 col-sm-8'>"+label+"</h3>\
      <p><span class='res_type'>"+type+"</span></p>\
      <a href='resource/"+uri+"'>\
        <img class='small_icon' src='static/imgs/play.png'/>\
      </a>\
    </section>";
  return res
}
// find apis for a category
function get_apis_for_category(section_id,n_res) {
  var apis = [];
  var num_apis = 0
  for (const res in conf) {
    // prune those that do not fall under the category (section_id)
    if (conf[res]["section_id"] == section_id) {
      apis.push(conf[res]["rest_api"]+RECOMMEND_SUFFIX);
      num_apis += 1;
    }
  }
  // split the number of requests (n_res) between apis
  var n_res_per_api = parseInt(n_res/num_apis) ;
  var reminder = parseInt(n_res % num_apis);
  if (reminder >=1) {n_res_per_api += reminder;}

  apis.forEach(function(part, index) {
    apis[index] += n_res_per_api.toString();
  });
  return apis
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

// show/update section on input change
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
    var counter = sorted_sections[i][1];
    // if section does not exist, create it
    if (document.getElementById("section_"+sorted_sections[i][0]) == undefined) {
      add_section(section_id,section_title,counter);
    } else {
      // update contents of an existing section
      $("#section_"+section_id+"_counter").attr('data-counter',sorted_sections[i][1]);
      // if the new counter is smaller than the num of paragraphs
      // if the new counter is greater than the num of paragraphs
    }

  }

}
