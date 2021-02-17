var cardList = [];

function getclasscards(id){

    fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/${id}`, {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(function (data){
        let set = data;
        cardList = [];
        $.each(set, function (key, obj) {
            if("collectible" in obj){
                cardList.push(obj.cardId)
            }
        })
    })
    .then(() => getcardinfo())
    .catch(err => {
        console.error(err);
    }); 
}


function getcardinfo(){
    $.each(cardList, function (index, value){
        fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then(function (info){
            var cardinfo = info[info.length - 1]
            if ("img" in cardinfo && cardinfo.type != "Hero"){
                if ("text" in cardinfo){
                    var spacing = cardinfo.text.replace(/_/g, " ");
                    var hashtag = spacing.replace(/#/g, "");
                    var backslash = hashtag.replace(/\\n/g, " ");
                    var xbox = backslash.replace(/\[x\]/g, "")
                    var newtext = xbox.replace(/\$/g, "");
                    
                }
                else{
                    var newtext = "";
                }
                var newflavor = cardinfo.flavor.replace(/\\n/g, " ")

                $('#cards').append(
                    $('<div/>')
                        .addClass("indiv-card")
                        .append(
                            $('<button/>')
                                .addClass("card")
                                .attr("data-bs-toggle", "modal")
                                .attr("data-bs-target", ("#card" + index))
                                .append(
                                    $('<img/>')
                                        .addClass("card-image")
                                        .attr("src", cardinfo.img)
                                        .attr("alt", cardinfo.name)
                                ),
                            $('<div/>')
                                .addClass("modal fade")
                                .attr("id", ("card" + index))
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
                                                                .append("<i><p>{0}</p></i>".format(newflavor))
                                                                .append("<b><h5>{0}</h5></b>".format(newtext))
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
                            .attr("data-bs-target", ("#cardback" + index))
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
                            .attr("id", ("cardback" + index))
                            .attr("tabindex", "-1")
                            .attr("arialabelledby", "exampleModalLabel")
                            .attr("aria-hidden", "true")
                            .append(
                                $('<div/>')
                                    .addClass("modal-dialog modal-dialog-centered")
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
})

// To Allow Text Formatting Function
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
};
