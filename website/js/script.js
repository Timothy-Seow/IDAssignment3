var standardList = [];
var wildList = [];
function getSets(){
    fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/info`, {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then(function (sets){
        $.each(sets, function (key, obj){
            if (key == "standard"){
                $.each(obj, function (index, value){
                    standardList.push(value);
                })
            }
            else if (key == "wild"){
                $.each(obj, function (index, value){
                    if (value != "Basic" && value != "Classic" && value != "Promo"){
                        if (wildList.includes(value) || standardList.includes(value)){
                        }
                        else{
                            wildList.push(value)
                        }
                    }
                })
            }
            
        })
    })
    .then(() => addSetButtons(standardList, wildList))
}

function addSetButtons(standard, wild){
    $('.standard-button-container').append(
        $('<h4/>')
        .addClass("standard-header")
        .text("Standard Sets"),
        $('<div/>')
        .addClass("standard-buttons")
    )
    $('.wild-button-container').append(
        $('<h4/>')
        .addClass("wild-header")
        .text("Wild Sets"),
        $('<div/>')
        .addClass("wild-buttons")
    )
    $.each(standard, function (index, value){
        $('.standard-buttons').append(
            $('<button/>')
                .attr("id", value)
                .text(value)
                .attr("onclick", "getSetCards(this.id)")
        )
    })
    $.each(wild, function (index, value){
        $('.wild-buttons').append(
            $('<button/>')
                .attr("id", value)
                .text(value)
                .attr("onclick", "getSetCards(this.id)")
        )
    })
}
var setCardList = [];
function getSetCards(setid){
    $("#player").remove();
    $("#lottie-player").append("<lottie-player id='player' src='https://assets3.lottiefiles.com/packages/lf20_jkanw7bv.json'  background='transparent'  speed='1'  style='width: 300px; height: 300px;'  loop autoplay></lottie-player>")
    document.getElementById("display-card").innerHTML = ("Loading " + setid +" Cards");
    fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/${setid}`, {
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
            if("collectible" in value){
                setCardList.push(value.cardId)
            }
        })
        setCardList.sort();
    })
    .then(() => getCardInfo(setCardList, setid))
    
}

var cardList = [];
function getClassCards(classid){
    document.getElementById("display-card").innerHTML = ("Loading " + classid +" Cards");
    $("#player").remove();
    $("#lottie-player").append("<lottie-player id='player' src='https://assets3.lottiefiles.com/packages/lf20_jkanw7bv.json'  background='transparent'  speed='1'  style='width: 300px; height: 300px;'  loop autoplay></lottie-player>")
    fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/${classid}`, {
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
            if("collectible" in obj){
                cardList.push(obj.cardId)
            }
        })
        cardList.sort()
    })
    .then(() => getCardInfo(cardList, classid))
    .catch(err => {
        console.error(err);
    }); 
}


function getCardInfo(cards, displayname){
    
    var changecards = document.getElementById('cards');
    changecards.innerHTML = "";
    var count = 0;
    $.each(cards, function (index, value){
        fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then(function (info){
            count += 1;
            console.log(count)
            if (count == Math.round((cards.length / 3))){
                document.getElementById("lottie-player").style.display = "none";
                document.getElementById("cards").style.display = "flex";
            }
            else if (count < Math.round((cards.length / 3))){
                document.getElementById("cards").style.display = "none";
            }
            else{
                document.getElementById("display-card").innerHTML = (count + " Cards Found For " + "\"" + displayname + "\"");
            }
            var cardinfo = info[0]
            if ("img" in cardinfo && cardinfo.type != "Hero"){
                if ("text" in cardinfo){
                    var cardtext = cardinfo.text;
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
                        cardtext = cardtext.replace(/\[x\]/g, "")
                    }
                    if (cardtext.includes("$")){
                        cardtext = cardtext.replace(/\$/g, "");
                    }
                }
                else{
                    var cardtext = "";
                }
                if ("flavor" in cardinfo){
                    var cardflavor = cardinfo.flavor
                    if (cardflavor.includes("\\n")){
                        cardflavor = cardflavor.replace(/\\n/g, " ")
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
                        ))
            }
        })
        .catch(err => {
            console.error(err);
        });
    })

}
fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cardbacks", {
"method": "GET",
"headers": {
    "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
    "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
    }
})
.then(response => response.json())
.then(function (back){
    $.each(back, function(index, value){
        var element = "<b>Description:</b><br>" + value.description + "<br>";
        if("howToGet" in value){
            element += "<br><b>How To Get:</b><br>" + value.howToGet;
        }
        if("img" in value){
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
    })
});

function searchInput(){
    var searchname = document.getElementById("cardsearch")
    searchname.onkeypress = function (e) {
        if (e.key === 'Enter'){
            searchCard();
            searchname.blur();
        }
    };
}

function searchCard(){
    var cardname = $("#cardsearch").val();
    if (cardname.includes(".") || cardname.startsWith(" ")){
    }
    else{
        searchCardInfo(cardname);
        document.getElementById("display-card").innerHTML = ("Loading Results For " + "\"" + cardname + "\"");
        $("#player").remove();
    $("#lottie-player").append("<lottie-player id='player' src='https://assets3.lottiefiles.com/packages/lf20_jkanw7bv.json'  background='transparent'  speed='1'  style='width: 300px; height: 300px;'  loop autoplay></lottie-player>")
    }
}

var searchedCardList = [];
function searchCardInfo(name){
    fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${name}`, {
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
                searchedCardList.push(value.cardId)
            }
        })
    })
    .then(() => getCardInfo(searchedCardList,name))
    .catch(err => {
        console.error(err);
        $("#player").remove();
        document.getElementById("display-card").innerHTML = ("No Results For " + "\"" + name + "\"");
    });
}


// To Allow Text Formatting Function
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
};

getSets();