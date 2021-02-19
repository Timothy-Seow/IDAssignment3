// jshint esversion: 6
// jshint esversion: 8
cardList = [];
cards = [];
generate();
function generate() {
    fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards", {/*fetch request to retrieve card id*/
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
                    });
                    count += 1;
                }
            });
        })
        .then(() => getcardinfo())
        .catch(err => {
            console.error(err);
        });
}

function getcardinfo() {
    var cardCount = 0;
    $.each(cardList, function (index, value) {
        fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${value}`, {/*fetch request to get data of card based on id*/
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
                "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then(function (info) {
                var cardinfo = info[info.length - 1];
                if ("img" in cardinfo && cardinfo.collectible == true) {
                    cards.push(cardinfo);
                    console.log('success');
                    cardCount += 1;
                }
            })
            .catch(err => {
                console.error(err);
            });
    });
}

var temp = [];
var packArray = [];

function generatePack() /*function to start generating a pack to open*/
{
    temp = [];
    var packArray = [];
    if(cards.length >= 100)/*checks if enough cards are loaded*/
    {
        $("#lottie").remove();/*removes lottie loadinig animation*/
        var pack = document.getElementById("packs");
        pack.innerHTML = "";
        var cardNumber;
        var card;
        while(packArray.length != 5)/*loop to limit 5 cards per pack*/
        {
            cardNumber = Math.floor(Math.random() * (cards.length));
            card = cards[cardNumber];
            if(packArray.includes(card))
            {
                continue;
            }
            else
            {
                packArray.push(card);/*appending cards to array*/
            }
        }
        var count = 0;
        
        $.each(packArray, function(index, obj) {/*goes through array to append each card to the page*/
            
            $("#packs").append(`<img onclick='revealCard(this.id)' class='pack-img' id='${count}' src='images/card-back.png' alt='cardback'>`);
            temp.push(obj.img);
            count ++;
        });
    }
    else
    {
        alert('please wait for pack to be ready');
    }
}

function revealCard(source)/*when user clicks on cardback, changes image to card image*/
{
    $(`#${source}`).attr('src', temp[source]);
}


