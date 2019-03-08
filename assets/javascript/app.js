// Initial array of topic
    var topics = ["Breakdancing", "Break Dance", "Breakin", "Poplocking"];

  // Generic function for capturing the topic name from the data-attribute
  function displayTopicName() {        
    
    $("button").on("click", function() {    //add a reset  or clear function here  
       
       var topicName = $(this).attr("data-name");
       // var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=dc6zaTOxFJmzC&limit=10"; 
       // var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=NJb4yFuuFG6N1EMEiOqDZOaiFSxHgbbx=10"; 
      
       var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NJb4yFuuFG6N1EMEiOqDZOaiFSxHgbbx&q="+ topicName + "&limit=10&offset=0&rating=G&lang=en";

          $.ajax({
            url: queryURL,
            method: "GET"  
          })
          .done(function(response) {
          console.log(response);
            var results = response.data;
            $("#gifs-appear-here").empty();
            $(".item").empty();

            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");

              var rating = results[i].rating;

              var p = $("<p>").text("Rating: " + rating);

              var topicImage = $("<img>");
              topicImage.attr("src", results[i].images.fixed_height_still.url);
              topicImage.attr("data-still", results[i].images.fixed_height_still.url);
              topicImage.attr("data-animate", results[i].images.fixed_height.url);
              topicImage.attr("data-state", "still");
              topicImage.attr("class", "gif");

              gifDiv.append(p);
              gifDiv.append(topicImage);
              $("#gifs-appear-here").append(gifDiv);
              
            } 
          pauseGifs();
          });        
    });
    // alert(topicName); 
  };


  // Function for displaying movie data
  function renderButtons() {

    // Deletes the topic prior to adding new topics to avoid repeating buttons)
    $("#topicButtons").empty();

    // Loops through the array of topics
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each topic in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var t = $("<button>");
      // Adding a class
      t.addClass("topic");
      // Added a data-attribute
      t.attr("data-name", topics[i]);
      // Provided the initial button text
      t.text(topics[i]);
      // Added the button to the HTML
      $("#topicButtons").append(t);
    }
  };


  // This function handles events where one button is clicked
  $("#add-topic").on("click", function(event) {
    event.preventDefault();

    // grabs the input from the textbox
    var topic = $("#topic-input").val().trim();

    // The topic entered in the textbox is then added to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  
  //pause gifs from giphy
  function pauseGifs() {
  $(".gif").on("click", function() {
      
      // variable named state that stores the image's data-state
      // Use the .attr() method for this.
      var state = $(this).attr("data-state");
      
      // Check if the variable state is equal to 'still',
      // then update the src attribute of this image to it's data-animate value,
      // and update the data-state attribute to 'animate'.

      // If state does not equal 'still', then update the src attribute of this
      // image to it's data-animate value and update the data-state attribute to 'still'
     
      if (state ==="still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
         $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still"); 
      }

  });
  };

  // Function for displaying the topic info
  // We're adding a click event listener to all elements with the class "topic"
  // We're adding the event listener to the document itself because it will
  // work for dynamically generated elements
  // $(".topic").on("click") will only add listeners to elements that are on the page at that time
  $(document).on("click", ".topic", displayTopicName);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  