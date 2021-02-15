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
    let card = data.Basic;
    console.log(card);
    cardList = card;
})
.catch(err => {
    console.error(err);
});

var testing = [];
function  test()
{
    var count = 0;
    console.log('test');
    $.each(cardList, function (index, value){
        count += 1;
        
        
        fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${value.name}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6656a0b8afmsha230c04208cbd77p13668djsn8507de8fe1ec",
            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then(function (info){
            console.log('success');
            info.forEach(data => {
                if(data.collectible == true)
                {
                    testing.push(data);
                }
            });
             
            
            
        })
        .catch(err => {
            console.error(err);
            
        });
        
    })
    console.log(count);
    
}

function test2()
{
    
    testing.forEach(card => {
        console.log(card);
    });
    
}