var cardList = [];

fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards", {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
        }
})
.then(response => response.json())
.then(function (data){
    let set = data;
    var count = 0;
    $.each(set, function (key, obj) {
        if (count < 4){
            $.each(obj, function (index, value){
                cardList.push(value.cardId);
            })
            count += 1;
        }
    })
})
.then(() => getcardinfo())
.catch(err => {
    console.error(err);
});

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
            if ("img" in cardinfo && cardinfo.collectible == true){
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
                            // To add Item's modal box which contain the Item's information
                            $('<div/>')
                                .addClass("modal fade")
                                .attr("id", ("card" + index))
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
                                                                .attr("src", cardinfo.img)
                                                                .attr("alt", cardinfo.name),
                                                            $('<h5/>')
                                                                .addClass("modal-title")
                                                                .attr("id", "exampleModalLabel")
                                                                .text(cardinfo.name)
                                                        ),
                                                    $('<div/>')
                                                        .addClass("modal-body")
                                                        .append()
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
        var element = "<b>Description</b><br>" + value.description + "<br>";
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
                                        $('<h4/>')
                                            .addClass("card-back-title")
                                            .text(value.name)
                                    )
                            ),
                        // To add Item's modal box which contain the Item's information
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
                                                        $('<h5/>')
                                                            .addClass("modal-title")
                                                            .attr("id", "exampleModalLabel")
                                                            .text(value.name)
                                                    ),
                                                $('<div/>')
                                                    .addClass("modal-body")
                                                    .append(element)
                                            )
                                    )
                            )
                    ));
        }
        
        
    })
})
