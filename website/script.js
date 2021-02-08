var cardList;

function getData() {
    const url = 'https://api.hearthstonejson.com/v1/latest/enUS/cards.json';
    fetch(url)
    .then(res => res.json())
    .then(function(data){
        cardList = data;
        displayCard();
    })
}

function displayCard(){
    $.each(cardList, function(index, value){
        //console.log(value.name);
    })
  
    //console.log(cardList.length)

}
getData();

function test(x)
{

    x.forEach(card => {
        console.log(card.name);
    });
}

test(cardList);