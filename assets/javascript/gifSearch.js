/**
 * Author: Garret Rueckert
 *
 * Homework 5 U of U Bootcamp - Giphy API search app
 */

//Key for GIPHY API
var key = "w5Cema1HKR635UzNp9npJZxaXlDhnMtt";

/**
 * Formats the query URL and hits the giphy api for 
 * 10 gifs to be added to the page.
 * @param search The search term determined by a gif button
 */
function searchGIPHY(search) {
  //formatting query URL to hit giphy API
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q="
     + search + "&api_key=" + key
     + "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    //validate response in case of bad search
    if(response.data.length > 0){
    for(var i = 0; i < 10; i++){
      addGIF(response, i);
    }
  } else {
    $("#imagesDiv").html("<h2>Oooops! Giphy had nothing for you!</h2>");
  }
  }).fail(function(err) {
    console.log(err);
    $("#imagesDiv").html("<h2>Oooops! Something broke!</h2>");
    throw err;
  });
}

/**
 * Adds a card gif to the page
 * @param response AJAX response object 
 * @param index Index in data[i].images...
 */
function addGIF(response, index) {
  var stillLink = response.data[index].images.downsized_still.url;
  var gifLink = response.data[index].images.downsized.url;
  var rating = "Rating: " + response.data[index].rating;
  
  var card = $("<div>");
  var cardBody = $("<div>");
  var cardTxt = $("<p>");

  card.addClass("card");
  cardBody.addClass("card-body");
  cardTxt.addClass("card-text");
  cardTxt.text(rating);

  cardBody.append(cardTxt);

  var g = $("<img>");
  g.addClass("img-fluid gif card-img-top");

  g.attr({
    src: stillLink,
    "data-state": "still",
    "data-still": stillLink,
    "data-animate": gifLink
  })

  card.append(g);
  card.append(cardBody);

  $("#imagesDiv").append(card);
}

/**
 * Adds a green gif button to the side panel
 * that will display the gifs requested when
 * pressed.
 * @param searchTerm User entered search term
 */
function addButton(searchTerm) {
  if (searchTerm != "") {
    var item = $("<li>");
    var btn = $("<button>");

    btn.addClass("btn btn-success gifBtn");
    btn.val(searchTerm);
    item.addClass("gifLI");
    btn.html(searchTerm);

    item.append(btn);
    $("#sidebar-buttons").append(item);
  }
}

/**
 * Removes gif buttons
 */
function clearButtons() {
  $("li").remove(".gifLI");
}

/**
 * Removes the gifs from the page
 */
function clearGifs(){
  $("#imagesDiv").empty();
}

/**
 * Toggles between moving and still image of gif
 * @param gif The gif clicked 
 */
function toggleGif(gif){
  if($(gif).attr("data-state") === "still"){

    $(gif).attr("src", $(gif).attr("data-animate"));
    $(gif).attr("data-state", "animate")

  } else if ($(gif).attr("data-state") === "animate"){

    $(gif).attr("src", $(gif).attr("data-still"));
    $(gif).attr("data-state", "still");
  }
}

/**
 * Click events
 */
$("#gifAdd").on("click", function(event) {
  event.preventDefault();
  var searchTerm = $("#search-text").val();
  addButton(searchTerm);
  $("#search-text").val("");
  //DEBUG: console.log("Hello I got clicked");
});

$("#resetBtn").on("click", function(event) {
  event.preventDefault();
  clearButtons();
  clearGifs();
  //DEBUG: console.log("Should remove green buttons.")
});

//Accessing dynamically created gif buttons
$(document).on("click", ".gifBtn", function(event){
  event.preventDefault();
  //DEBUG:
  //console.log(this);
  clearGifs();
  searchGIPHY($(this).val());
});

$(document).on("click", ".gif", function(event) {
  event.preventDefault();
  toggleGif(this);
});

$("#search-form").submit(function(event){
  event.preventDefault();
});


/**
 * Setting up initial buttons
 */
 addButton("Mario");
 addButton("Luigi");
 addButton("Bowser");
 addButton("Yoshi");
 addButton("Wario");
 addButton("Waluigi");