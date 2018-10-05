

//array of animal names will be turned into buttons
var animallist = ["cat", "dog", "chicken", "lion", "tiger", "hipo", "monkey", "skunk", "snake", "rooster"];

//creating button, tie names to buttons
function renderButtons () {
  document.getElementById("btnArea").innerHTML = "";
  for (var i=0; i<animallist.length; i++) {  
    var animalBtn = document.createElement("button");
    animalBtn.setAttribute("class", "btn_class");
    var btnText = document.createTextNode(animallist[i]);
    animalBtn.appendChild(btnText);
    document.getElementById("btnArea").appendChild(animalBtn);  
    console.log (animalBtn);
  }
}
 
 renderButtons();

//tie buttons to giphy API
$(document).on("click", "button", function() {
  var animal = $(this).text();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=5YMrfE5WSgVja3ZuCAeMGph0pae2UckP";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      console.log(queryURL);
      console.log(response);

      var results = response.data;
        for (var j = 0; j < results.length; j++) {
          var animalDiv = $("<div>");
          var p = $("<p>").text("Rating: " + results[j].rating);
          var animalImage = $("<img>");
          animalImage.attr("src", results[j].images.fixed_height.url);
          animalImage.attr("data-still", results[j].images.fixed_height_still.url);
          animalImage.attr("data-animate", results[j].images.fixed_height.url);
          animalImage.attr("data-state", "animate");
          animalImage.addClass("animalImg");
          animalDiv.append(p);
          animalDiv.append(animalImage);
          $("#gifs-appear-here").prepend(animalDiv);
        }
      });
  }); 

  //turning animation on or off
  $(document).on("click", ".animalImg", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  //enter new animal and add that to button list
$("#inputId").on("click", function(){
  var newAnimal=document.getElementById("inputText").value; 
  animallist.push(newAnimal);
  renderButtons();
})