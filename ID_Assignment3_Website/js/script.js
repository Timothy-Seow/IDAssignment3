// jshint esversion: 6
// jshint esversion: 8
var standardList = [];
var wildList = [];
function getSets(){
    fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/info`, { // Fetch info on Hearthstone
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then(function (sets){
        $.each(sets, function (key, obj){
            if (key == "standard"){ // To get Standard Sets
                $.each(obj, function (index, value){
                    standardList.push(value);
                });
            }
            else if (key == "wild"){ // To get Wild Sets
                $.each(obj, function (index, value){
                    if (value != "Promo"){ // Prevent empty set from getting pushed to list
                        if (wildList.includes(value) || standardList.includes(value)){ // Remove duplicates in Wild Set that is already in Standard Set
                        }
                        else{
                            wildList.push(value);
                        }
                    }
                });
            }
            
        });
    })
    .then(() => addSetButtons(standardList, wildList)); // Execute the function, passing in 2 lists containing all standard and wild sets
}

function addSetButtons(standard, wild){
    $('.standard-button-container').append( // Add a Standard Set button container
        $('<h4/>')
        .addClass("standard-header")
        .text("Standard Sets"),
        $('<div/>')
        .addClass("standard-buttons")
    );
    $('.wild-button-container').append( // Add a Wild Set button container
        $('<h4/>')
        .addClass("wild-header")
        .text("Wild Sets"),
        $('<div/>')
        .addClass("wild-buttons")
    );
    $.each(standard, function (index, value){ // Add button for each Standard Set
        $('.standard-buttons').append(
            $('<button/>')
                .attr("id", value)
                .text(value)
                .attr("onclick", "getSetCards(this.id)") // Add onclick funtion
        );
    });
    $.each(wild, function (index, value){ // Add button for each Wild Set
        $('.wild-buttons').append(
            $('<button/>')
                .attr("id", value)
                .text(value)
                .attr("onclick", "getSetCards(this.id)") // Add onclick function
        );
    });
}
var setCardList = [];
function getSetCards(setid){
    $("#player").remove(); // Remove lottie animation
    $("#lottie-player").append("<lottie-player id='player' src='https://assets3.lottiefiles.com/packages/lf20_jkanw7bv.json'  background='transparent'  speed='1'  style='width: 300px; height: 300px;'  loop autoplay></lottie-player>"); // Add lottie animation
    document.getElementById("display-card").innerHTML = ("Loading " + setid +" Cards");
    fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/${setid}`, { // Fetch relevant cards based on Set
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(function (cards){
        setCardList = [];
        $.each(cards, function (index, value){
            if("collectible" in value){ // If the card is collectible then push to list
                setCardList.push(value.cardId);
            }
        });
    })
    .then(() => getCardInfo(setCardList, setid)); // Execute the function
    
}

var cardList = [];
function getClassCards(classid){
    document.getElementById("display-card").innerHTML = ("Loading " + classid +" Cards"); // Display loading message
    $("#player").remove(); // Remove lottie animation
    $("#lottie-player").append("<lottie-player id='player' src='https://assets3.lottiefiles.com/packages/lf20_jkanw7bv.json'  background='transparent'  speed='1'  style='width: 300px; height: 300px;'  loop autoplay></lottie-player>"); // Add lottie animation
    fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/${classid}`, { // Fetch relevant cards based on Class
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(function (data){
        cardList = [];
        $.each(data, function (key, obj) {
            if ("collectible" in obj){ // If card is collectible then push to list
                cardList.push(obj.cardId);
            }
        });
    })
    .then(() => getCardInfo(cardList, classid)) // Execute the function, passing in the list and the class ID
    .catch(err => {
        console.error(err);
    }); 
}


function getCardInfo(cards, displayname){
    var changecards = document.getElementById('cards'); // Get the element
    changecards.innerHTML = ""; // Remove all current cards
    var count = 0;
    $.each(cards, function (index, value){
        fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${value}`, { // Fetch relevant cards based on card ID
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then(function (info){
            count += 1;
            if (count == Math.round((cards.length / 3))){ // If number of cards reach one third
                $("#player").remove(); // Remove lottie animation
                document.getElementById("cards").style.display = "flex"; // Show the cards after a certain amount
            }
            else if (count < Math.round((cards.length / 3))){
                document.getElementById("cards").style.display = "none"; // Hide the cards before a certain amount
            }
            else {
                document.getElementById("display-card").innerHTML = (count + " Cards Found For " + "\"" + displayname + "\""); // To show how many cards are found
            }
          var cardtext = "";
            var cardinfo = info[0];
          	var cardflavor = "";
            if ("img" in cardinfo && cardinfo.type != "Hero"){ // To check if Card have image and its not a "Hero" card
                if ("text" in cardinfo){ // To check if there is a desription for the Card
                    cardtext = cardinfo.text; // Create Card description string
                    // To check if text have any of these characters and replace them accordingly
                    if (cardtext.includes("_")){
                        cardtext = cardtext.replace(/_/g, " ");
                    }
                    if (cardtext.includes("#")){
                        cardtext = cardtext.replace(/#/g, "");
                    }
                    if (cardtext.includes("\\n")){
                        cardtext = cardtext.replace(/\\n/g, " ");
                    }
                    if (cardtext.includes("[x]")){
                        cardtext = cardtext.replace(/\[x\]/g, "");
                    }
                    if (cardtext.includes("$")){
                        cardtext = cardtext.replace(/\$/g, "");
                    }
                }
                else {
                    cardtext = "";
                }
                if ("flavor" in cardinfo){
                    cardflavor = cardinfo.flavor;
                    if (cardflavor.includes("\\n")){
                        cardflavor = cardflavor.replace(/\\n/g, " ");
                    }
                }
                $('#cards').append(
                    $('<div/>')
                        .addClass("indiv-card")
                        .append(
                            $('<button/>')
                                .addClass("card")
                                .attr("data-bs-toggle", "modal")
                                .attr("data-bs-target", ("#card" + cardinfo.dbfId))
                                .append(
                                    $('<img/>')
                                        .addClass("card-image")
                                        .attr("src", cardinfo.img)
                                        .attr("alt", cardinfo.name)
                                ),
                            $('<div/>')
                                .addClass("modal fade")
                                .attr("id", ("card" + cardinfo.dbfId))
                                .attr("tabindex", "-1")
                                .attr("arialabelledby", "exampleModalLabel")
                                .attr("aria-hidden", "true")
                                .append(
                                    $('<div/>')
                                        .addClass("modal-dialog modal-dialog-centered modal-lg")
                                        .append(
                                            $('<div/>')
                                                .addClass("modal-content")
                                                .append(
                                                    $('<div/>')
                                                        .addClass("modal-header")
                                                        .append(
                                                            $('<img/>')
                                                                .addClass("card-image")
                                                                .attr("src", cardinfo.img)
                                                                .attr("alt", cardinfo.name),
                                                            $('<div/>')
                                                                .addClass("modal-title card-detail")
                                                                .attr("id", "exampleModalLabel")
                                                                .append("<b><h4>{0}</h4></b>".format(cardinfo.name))
                                                                .append("<i><p>{0}</p></i>".format(cardflavor))
                                                                .append("<b><h5>{0}</h5></b>".format(cardtext))
                                                                .append(
                                                                    $('<ul/>')
                                                                    .append("<li>Type: {0}</li>".format(cardinfo.type))
                                                                    .append("<li>Rarity: {0}</li>".format(cardinfo.rarity))
                                                                    .append("<li>Set: {0}</li>".format(cardinfo.cardSet))
                                                                    .append("<li>Class: {0}</li>".format(cardinfo.playerClass))
                                                                    .append("<li>Artist: {0}</li>".format(cardinfo.artist))
                                                                    .append("<li>Collectible</li>")
                                                                )
                                                        )
                                                )
                                        )
                                )
                        ));
            }
        })
        .catch(err => {
            console.error(err);
        });
    });

}
fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cardbacks", { // Fetch all CardBacks information
"method": "GET",
"headers": {
    "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
    "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
    }
})
.then(response => response.json())
.then(function (back){
    $.each(back, function(index, value){
        var element = "<b>Description:</b><br>" + value.description + "<br>"; // To create string to append
        if ("howToGet" in value){ // To check if there is a "How to Get" information in the data and add to the string
            element += "<br><b>How To Get:</b><br>" + value.howToGet;
        }
        if ("img" in value){ // To check if there is an image in the data then append
            $('#card-backs').append(
                $('<div/>')
                    .addClass("indiv-cardback")
                    .append(
                        $('<button/>')
                            .addClass("cardback")
                            .attr("data-bs-toggle", "modal")
                            .attr("data-bs-target", ("#cardback" + value.cardBackId))
                            .append(
                                $('<img/>')
                                    .addClass("card-back-image")
                                    .attr("src", value.img)
                                    .attr("alt", value.name),
                                $('<div/>')
                                    .addClass("card-back-body")
                                    .append(
                                        $('<h5/>')
                                            .addClass("card-back-title")
                                            .text(value.name)
                                    )
                            ),
                        $('<div/>')
                            .addClass("modal fade")
                            .attr("id", ("cardback" + value.cardBackId))
                            .attr("tabindex", "-1")
                            .attr("arialabelledby", "exampleModalLabel")
                            .attr("aria-hidden", "true")
                            .append(
                                $('<div/>')
                                    .addClass("modal-dialog modal-dialog-centered modal-lg")
                                    .append(
                                        $('<div/>')
                                            .addClass("modal-content")
                                            .append(
                                                $('<div/>')
                                                    .addClass("modal-header")
                                                    .append(
                                                        $('<img/>')
                                                            .attr("src", value.img)
                                                            .attr("alt", value.name),
                                                        $('<div/>')
                                                            .addClass("modal-title")
                                                            .attr("id", "exampleModalLabel")
                                                            .append("<b><h4>{0}</h4></b><br>".format(value.name))
                                                            .append(element)
                                                    )
                                            )
                                    )
                            )
                    ));
            }
    });
});

function searchInput(){
    var searchname = document.getElementById("cardsearch"); // To get the input field
    searchname.onkeypress = function (e) {
        if (e.key === 'Enter'){ // To check if user pressed enter
            document.getElementById("cards").innerHTML = ""; // Clear all previous cards
            $("#player").remove(); // Remove lottie animation
            $("#lottie-player").append("<lottie-player id='player' src='https://assets3.lottiefiles.com/packages/lf20_jkanw7bv.json'  background='transparent'  speed='1'  style='width: 300px; height: 300px;'  loop autoplay></lottie-player>"); // Add lottie animation
            searchCard(); // Execute the function
            searchname.blur(); // To unfocus from the search bar
        }
    };
}

function searchCard(){
    var cardname = $("#cardsearch").val(); // To get the input value
    if (cardname.includes(".") || cardname.startsWith(" ")){ // To check if its a valid input
    }
    else {
        searchCardInfo(cardname); // Execute the function
        document.getElementById("display-card").innerHTML = ("Loading Results For " + "\"" + cardname + "\""); // Display the loading of search results
    }
}

var searchedCardList = [];
function searchCardInfo(name){
    fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${name}`, { // Fetch relevant cards according to search input
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(function (data){
        searchedCardList = [];
        $.each(data, function (index, value){
            if("collectible" in value){
                searchedCardList.push(value.cardId); // Push the searched card IDs into a list
            }
        });
    })
    .then(() => getCardInfo(searchedCardList,name)) // Execute the function
    .catch(err => {
        console.error(err);
        $("#player").remove(); // Remove lottie animation
        document.getElementById("display-card").innerHTML = ("No Results For " + "\"" + name + "\""); // Display search results if there is no such card
    });
}


topbutton = document.getElementById("topbtn"); // Get the button

window.onscroll = function() { // When the user scrolls down from the top of the page, execute the function
    scrollFunction();
};

function scrollFunction() {
  if (document.documentElement.scrollTop > 20) { // When user scroll down 20px from the top of the page, show the button
    topbutton.style.display = "block";
  } 
  else {
    topbutton.style.display = "none";
  }
}

function topFunction() { // Scroll to the top of the page when user click
  document.documentElement.scrollTop = 0;
}


// To Allow Text Formatting Function
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
};

getSets(); // Execute the function