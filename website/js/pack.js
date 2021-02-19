cardList = [];
cards = [];
generate();
function generate() {
    fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
        }
    })
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            var count = 0;
            $.each(data, function (key, obj) {
                if (count < 4) {
                    $.each(obj, function (index, value) {
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
}

function getcardinfo() {
    var cardCount = 0;
    $.each(cardList, function (index, value) {
        fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${value}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
                "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then(function (info) {
                var cardinfo = info[info.length - 1]
                if ("img" in cardinfo && cardinfo.collectible == true) {
                    cards.push(cardinfo);
                    console.log('success');
                    cardCount += 1;
                }
            })
            .catch(err => {
                console.error(err);
            });
    })
}

var temp = [];
var packArray = [];

function generatePack()
{
    temp = [];
    var packArray = [];
    if(cards.length >= 100)
    {
        $("#lottie").remove();
        var pack = document.getElementById("packs");
        pack.innerHTML = "";
        var cardNumber;
        var card;
        while(packArray.length != 5)
        {
            cardNumber = Math.floor(Math.random() * (cards.length));
            card = cards[cardNumber];
            if(packArray.includes(card))
            {
                continue;
            }
            else
            {
                packArray.push(card);
            }
        }
        var count = 0
        
        $.each(packArray, function(index, obj) {
            
            $("#packs").append(`<img onclick='revealCard(this.id)' class='pack-img' id='${count}' src='images/card-back.png'>`);
            temp.push(obj.img)
            count ++;
        })
    }
    else
    {
        alert('please wait for pack to be ready');
    }
}

function revealCard(source)
{
    $(`#${source}`).attr('src', temp[source])
}


