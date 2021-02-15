
cardList = [];
cards = [];
function generate() {
    alert('generate');

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
            if ("img" in cardinfo && cardinfo.collectible == true){
                cards.push(cardinfo);
                console.log('success');
            }
        })
        .catch(err => {
            console.error(err);
        });
    })


}

function test()
{
    
    var cardNumber = Math.floor(Math.random() * (cards.length));
    var card = cards[cardNumber];
    $("#image-name").text(card.name);
    $("#quiz-image").attr("src", card.img);

    // what set
    // what class
    // type
    // cost

    var questionNumber = Math.floor(Math.random() * (4)) + 1;
    var newarray;

    
    if(questionNumber === 1)
    {
        $("#question-title").text("What class does this card belong to?")
        newarray = getClass(card.playerClass);
        randomizer(newarray);
    }
    else if(questionNumber === 2)
    {
        $("#question-title").text("What is the rarity of this card?")
        newarray = getRarity(card.rarity);
        randomizer(newarray);
    }
    else if(questionNumber === 3)
    {
        $("#question-title").text("How much does it cost to play this card?")
        newarray = getCost(card.cost);
        randomizer(newarray);
    }


}

function getCost(x)
{
    var newArray = [x];
    var cardNumber;
    var newcard;
    while(newArray.length != 4)
    {
        cardNumber = Math.floor(Math.random() * (cards.length));
        newcard = cards[cardNumber];
        

        if(newArray.includes(newcard.cost))
        {
            continue;
        }
        else
        {
            newArray.push(newcard.cost);
        }
        
    }
    console.log(newArray)
    return newArray;
}

function getSet(x)
{
    var newArray = [x];
    var cardNumber;
    var newcard;
    while(newArray.length != 4)
    {
        cardNumber = Math.floor(Math.random() * (cards.length));
        newcard = cards[cardNumber];
        console.log('hi');
        console.log(newcard);
        console.log(newcard.cardSet);

        if(newArray.includes(newcard.cardSet))
        {
            continue;
        }
        else
        {
            newArray.push(newcard.cardSet);
        }
        
    }
    console.log(newArray)
    return newArray;
}

function getRarity(x)
{
    var newArray = [x];
    var cardNumber;
    var newcard;
    while(newArray.length != 4)
    {
        cardNumber = Math.floor(Math.random() * (cards.length));
        newcard = cards[cardNumber];
        console.log('hi');
        console.log(newcard);
        console.log(newcard.rarity);

        if(newArray.includes(newcard.rarity))
        {
            continue;
        }
        else
        {
            newArray.push(newcard.rarity);
        }
        
    }
    console.log(newArray)
    return newArray;
}

function getClass(x)
{
    var newArray = [x];
    var cardNumber;
    var newcard;
    while(newArray.length != 4)
    {
        cardNumber = Math.floor(Math.random() * (cards.length));
        newcard = cards[cardNumber];
        console.log('hi');
        console.log(newcard);
        console.log(newcard.playerClass);

        if(newArray.includes(newcard.playerClass))
        {
            continue;
        }
        else
        {
            newArray.push(newcard.playerClass);
        }
        
    }
    console.log(newArray)
    return newArray;
}


function randomizer(list)
{
    for(let i = list.length - 1; i > 0; i --)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    
    for(let x = 0; x < list.length; x++)
    {
        $(`#label${x+1}`).text(list[x]);
    }
}