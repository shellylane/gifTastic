/**Array of initial buttons**/
var topics = ["puppy", "pygmy goat", "sloth", "elephant", "meerkat"];

function renderButtons() {
  $("#buttons-div").empty();
  for (var i = 0; i < topics.length; i++) {
    var b = $("<button>");
    b.addClass("btn btn-primary btn-xs animal-button");
    b.attr("id", "animal-button");
    b.attr("data-name", topics[i]);
    b.text(topics[i]);
    $("#buttons-div").append(b);
    console.log(topics[i]);
  }
}

function displayImages() {
  $(".animal-button").on("click", function() {
    console.log("click!");
    var animalTopic = $(this).attr("data-name");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animalTopic +
      "&api_key=PENq0OFYOmzDr7U26tJtLjqJ9Z3VdUS7&limit=10";
    // AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      $("#gif-container").empty();

      var results = response.data;
      // Loop over every result item
      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r") {
          var gifDiv = $("<div class='item'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          // Adding still/animate
          animalImage.attr(
            "data-still",
            results[i].images.fixed_height_still.url
          );
          animalImage.attr("data-animate", results[i].images.fixed_height.url);
          animalImage.attr("data-state", "still");
          gifDiv.append(animalImage);
          gifDiv.append(p);
          $("#gif-container").prepend(gifDiv);
          $(animalImage).on("click", function() {
            // Setting the data-state of the GIFs when clicked
            var state = $(this).attr("data-state");

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));

              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        }
      }
    });
  });
}

function remakeButtons() {
  $("#add-topic").on("click", function(event) {
    event.preventDefault();

    var animal = $("#inputDefault")
      .val()
      .trim();

    topics.push(animal);
    console.log(topics);
    $("#inputDefault").val("");

    renderButtons();
    displayImages();
  });
}

$(document).ready(function() {
  remakeButtons();
  renderButtons();
  displayImages();
});
