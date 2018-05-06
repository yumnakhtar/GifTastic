      // Initial array of movies
      var movies = ["Batman", "The Joker", "Two Faced", "Bane"];

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var newButton = $("<button>");
          // Adding a class of movie-btn to our button
          newButton.addClass("movie-btn");
          // Adding a data-attribute
          newButton.attr("data-name", movies[i]);
          // Providing the initial button text
          newButton.text(movies[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(newButton);
        }
      }

  

      // This function handles events where a movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();

        // Adding movie from the textbox to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

             // Calling the renderButtons function to display the intial buttons
             renderButtons();

      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".movie-btn", displayMovieInfo);

   