$(document).ready(function() {

});

// callback function - query sonic index
function cb(selection) {
  $("#search").empty();
  if (selection.length) {
    $.getJSON({
        url: "/index",
        data: { "data": selection },
        success: function (result) {
          console.log(result);
          for (i = 0; i < result.length; i++) {
            $("#search").append("<p><a href='resource/"+result[i].uri+"'>"+result[i].label+"</a></p>");
          }
        }

    });
  } else {$("#search").empty();}

}
