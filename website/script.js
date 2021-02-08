async function getData() {
    const url = 'https://api.hearthstonejson.com/v1/latest/enUS/cards.json';
    const response = await fetch(url);
    const data = await response.json();
    cardList = data;
    console.log(data);
}
//test
getData();