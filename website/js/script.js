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
        const cardimage = `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${value.id}.png`
        if (value.type != "HERO" || value.type != "HERO_POWER" || value.type != "ENCHANTMENT"){
            $('.card-container').append(
                $('<div/>')
                .append(
                    $('<img/>')
                    .attr("src", cardimage)
                )
            )
        }
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
