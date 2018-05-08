
var villains = ["Bane", "Two-Face", "Joker", "Deadshot"];
var apiKey = "sZR5ZpCqMPKZXVX0X6IphpQPULnfT8eJ";


//get and print gifs
function displayVillains() {
  var villain = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    villain + "&api_key=sZR5ZpCqMPKZXVX0X6IphpQPULnfT8eJ&limit=10";
  // this puts a limit of 10 images to be displayed at once

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#villain-view").empty();
    // dynamically generating a div to hold the 'villain'
    var villainDiv = $("<div class = 'villain'>");
    var results = response.data;
  //iterate through array or results
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);

      var villainImg = $("<img>");
      //create data-state='still' attr so we can pause/play the gifs
      villainImg.attr("src", results[i].images.fixed_height_still.url);
      villainImg.attr("data-still", results[i].images.fixed_height_still.url);
      villainImg.attr("data-animate", results[i].images.fixed_height.url);
      villainImg.attr("data-state", "still");
      villainImg.attr("class", "gif");

      // add a source attribute
      villainImg.attr("src", results[i].images.fixed_height_still.url);
      // prepend results to the p tag variable
      villainDiv.prepend(p);
      villainDiv.prepend(villainImg);
      $("#villain-view").prepend(villainDiv);
    }
  })
}

//displaying all buttons in array villains
function renderButtons() {
  //deletes all existing buttons
  $("#buttons-view").empty();

  // loop through array
  for (var i = 0; i < villains.length; i++) {
    //new button tag
    var newButton = $("<button>");
    // class="villain-btn" given to button tag
    newButton.addClass("villain-btn");
    // data-name is the villains name
    newButton.attr("data-name", villains[i]);
    // the label of each button
    newButton.text(villains[i]);
    // appending onto html
    $("#buttons-view").append(newButton);
  }
}

//adding new buttons
$("#add-villain").on("click", function (event) {
  event.preventDefault();
  // grabs user input
  var villain = $("#villain-input").val().trim();
  //add newly inputted value to villains array 
  villains.push(villain);

  renderButtons();
});

var pauseImages = function () {
  event.preventDefault();

  //grabs onto "data-state" value
  var state = $(this).attr("data-state");

  //checks data-state, acts accordingly
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

//listens for click on .villain-btn
$(document).on("click", "button", displayVillains);
//listen for clicks on gif
$(document).on("click", ".gif", pauseImages);

// Calling the renderButtons function to display the intial buttons
renderButtons();