// jshint esversion: 6
// jshint esversion: 8
cardList = [];
cards = [];

var answer = 0;
var score = 0;

function startGame() {/*function to start game */
    
    if (100 <= cards.length) {/*checking if there are more than 100 cards before starting the game*/
        questionRandomizer();
        $("#submitBtn").attr("onclick", "checkAnswer()");
        $("#submitBtn").text("Submit");
    }
    else/*alert to tell user that game is still loading*/
    {
        alert("please wait for the quiz to load!");
        console.log(cards.length);
    }
}

generate();
function generate() {/*retrieve card data from api*/
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
                if (count < 4) {/*limits cards to 4 expansions due to fetch request limit*/
                    $.each(obj, function (index, value) {
                        cardList.push(value.cardId);/*appends card id into list */
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

    $(".quiz-loading").remove();
    $("#quiz-container").append("<div class='chosen-card'>" +/*appends quiz for user to interact with*/
        "<div id='image-name'>Card Name</div>" +
        "<div class='content-container'>" +
        "<img id='quiz-image' src='images/card-back.png' alt='cardback' >" +
        "<div class='quiz-question'>" +
        "<div id='question-title'>quiz question</div>" +
        "<form class='question-answers'>" +
        "<div class='answer-option'><input class='answer' type='radio' id='answer1' name='quiz' value='1'>" +
        "<label class='label-options' id='label1' for='answer1'>Answer 1</label></div><br>" +
        "<div class='answer-option'><input class='answer' type='radio' id='answer2' name='quiz' value='2'>" +
        "<label class='label-options' id='label2' for='answer2'>Answer 2</label></div><br>" +
        "<div class='answer-option'><input class='answer' type='radio' id='answer3' name='quiz' value='3'>" +
        "<label class='label-options' id='label3' for='answer3'>Answer 3</label></div><br>" +
        "<div class='answer-option'><input class='answer' type='radio' id='answer4' name='quiz' value='4'>" +
        "<label class='label-options' id='label4' for='answer4'>Answer 4</label></div><br><br><br>" +
        "<button type='button' onclick='startGame()' id='submitBtn'>Start</button>" +
        "</form>" +
        "</div>" +
        "</div>" +
        "</div>");

    $.each(cardList, function (index, value) {/*goes through each card id in the name to retrieve specific card data*/

        fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${value}`, {
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

function questionRandomizer() {/*randomizes questions chosen*/


    var cardNumber = Math.floor(Math.random() * (cards.length));
    var card = cards[cardNumber];
    $("#image-name").text(card.name);
    $("#quiz-image").attr("src", card.img);

    var questionNumber = Math.floor(Math.random() * (3)) + 1;
    var newarray;



    if (questionNumber === 1) {
        $("#question-title").text("What class does this card belong to?");
        newarray = getClass(card.playerClass);
        answer = randomizer(newarray, card.playerClass);
    }
    else if (questionNumber === 2) {
        $("#question-title").text("What is the rarity of this card?");
        newarray = getRarity(card.rarity);
        answer = randomizer(newarray, card.rarity);
    }
    else if (questionNumber === 3) {
        $("#question-title").text("How much does it cost to play this card?");
        newarray = getCost(card.cost);
        answer = randomizer(newarray, card.cost);
    }

}

function getCost(x) {/*gets dummy answers from other cards with a different value*/
    var newArray = [x];
    var cardNumber;
    var newcard;
    while (newArray.length != 4) {
        cardNumber = Math.floor(Math.random() * (cards.length));
        newcard = cards[cardNumber];


        if (newArray.includes(newcard.cost)) {
            continue;
        }
        else {
            newArray.push(newcard.cost);
        }

    }

    return newArray;
}

function getRarity(x) {/*gets dummy answers from other cards with a different value*/
    var newArray = [x];
    var cardNumber;
    var newcard;
    while (newArray.length != 4) {
        cardNumber = Math.floor(Math.random() * (cards.length));
        newcard = cards[cardNumber];

        if (newArray.includes(newcard.rarity)) {
            continue;
        }
        else {
            newArray.push(newcard.rarity);
        }

    }

    return newArray;
}

function getClass(x) {/*gets dummy answers from other cards with a different value*/
    var newArray = [x];
    var cardNumber;
    var newcard;
    while (newArray.length != 4) {
        cardNumber = Math.floor(Math.random() * (cards.length));
        newcard = cards[cardNumber];


        if (newArray.includes(newcard.playerClass)) {
            continue;
        }
        else {
            newArray.push(newcard.playerClass);
        }

    }
    return newArray;
}


function randomizer(list, answer) {/*randomizes the order of which  the answers are placed*/
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }

    for (let x = 0; x < list.length; x++) {
        $(`#label${x + 1}`).text(list[x]);
    }

    var index = list.indexOf(answer) + 1;
    console.log(list);
    console.log(index);
    return index;
}


function checkAnswer() {/*function to check if answer selected is correct*/
    
    var check = document.querySelector('input[name = "quiz"]:checked').value;
    if (check != null) {
        if (check == answer) {
            alert('Congratulations! You got the correct answer!');
        }
        else {
            alert("Unfortunately that was not the correct answer!");
        }
        nextQuestion();
    }
    else {
        alert("Please select an option!");
    }
    
}

function nextQuestion()/*function to load next question*/
{
        $("#submitBtn").attr("onclick", "startGame()");
        $("#submitBtn").html("Next Question");
}