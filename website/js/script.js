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
        console.log(value)
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
                $('.card-container').append(
                    $('<div/>')
                    .append(
                        $('<img/>')
                        .addClass("indiv-card")
                        .attr("src", cardinfo.img)
                        
                    )
                )
            }
        })
        .catch(err => {
            console.error(err);
        });
        
    })
}