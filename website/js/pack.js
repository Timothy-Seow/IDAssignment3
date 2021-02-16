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
    $(".quiz-loading").remove();
    $("#quiz-container").append("<div class='chosen-card'>" +
        "<div id='image-name'>Card Name</div>" +
        "<div class='content-container'>" +
        "<img id='quiz-image' src='images/card-back.png'>" +
        "<div class='quiz-question'>" +
        "<div id='question-title'>quiz question</div>" +
        "<form class='question-answers'>" +
        "<input class='answer' type='radio' id='answer1' name='quiz' value='1'>" +
        "<label id='label1' for='answer1'>Answer 1</label><br>" +
        "<input class='answer' type='radio' id='answer2' name='quiz' value='2'>" +
        "<label id='label2' for='answer2'>Answer 2</label><br>" +
        "<input class='answer' type='radio' id='answer3' name='quiz' value='3'>" +
        "<label id='label3' for='answer3'>Answer 3</label><br>" +
        "<input class='answer' type='radio' id='answer4' name='quiz' value='4'>" +
        "<label id='label4' for='answer4'>Answer 4</label><br><br><br>" +
        "<button type='button' onclick='startGame()' id='submitBtn'>Start</button>" +
        "</form>" +
        "</div>" +
        "</div>" +
        "</div>");
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

function generatePack()
{
    var packArray = [];
    if(cards.length === 418)
    {
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
            count ++;
            $("#packs").append(`<img class="pack-img"id='${obj.img}' src='${obj.img}'>`)

        })


    }
    else
    {
        alert('please wait for pack to be ready');
    }
}


$(".pack-img").click(function(){
    // Change src attribute of image
    $(this).attr("src", this.id);
    alert(this.id);
});    
