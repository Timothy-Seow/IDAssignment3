# IDAssignment3

## Project's Name:
ID Assignment 3 - Hearthstone Wiki

## Contributors
Dave Tan Kun Yi
Timothy Seow Yi Heng

## Overview
The website that we have made is based on this game called Hearthstone. It is an online card game that allows players to build their own deck of 30 cards and battle it out against other players online.

The main purpose of this website is to allow players to find information on the cards that are available currently in the game. Based on the current patch, the total number of playing cards now is more than two thousand, so its not easy to remember all the card's information, which is why this website comes in handy. 

While players are able to find informatio about various cards, they will also be able to test thier knowledge with our hearthstone quiz. This quiz will randomly choose a card and generate 1 out of 3 possible questions with 4 options each question.

Players can also try their luck with our pack opening simulator. This pack opening simulator generates 5 random cards for the player to open. This allows players to feel out their luck for their day and may help them decide if they would like to open packs in the actual game.

Players can also register and account or sign into an existing one.

## Design Process
The goal of this website is to allow players to look for information easily. For this reason, we chose to split up our site into different sections. When players are looking for cards, they will go to the cards page. If they are looking for other information, they can easily navigate to each section using the nav bar.

For the cards page, we decided that we wanted to implement a filtering system as there are too many cards in this game for  the user to scroll through and look for. The filtering system helps in shortening the time it takes a user to find a specific cards as well as allows the user to filter cards based on  categories like classes and sets. We chose to filter based on classes and sets as we feel it is the most important when looking for information. We also implemented a search bar for users to search via the card name. This makes it much easier for users to find specific cards. When clicking on a card, a popup will appear showing the user additional information about the card.

For our card backs page, we chose to keep it simple and display the cards in rows. We chose to do this as users will be able to see many different cards in one page. This allows them to much more easily find the cardback they are looking for. When clicking on the cardbacks, the user can also find out more information on the cardback such as where its from and how to obtain it.

To make our site more interactive we implemented our quiz page. We wanted it to be easily understandable, which is why we made it very simple. Only showing the card image, questions and options. This makes it so that an in depth guide on how to play the quiz is not needed.

We decided to implement a pack opening function as many players like ourselves love opening packs. Unfortunately, opening packs in game can be costly and unrewarding at times. Because of  that, a pack opening simulator helps players scratch that pack opening itch as well as provide them with a vague idea of the chances of getting a rare card in game.

When implementing an accounts feature, we were thinking of using it to store information such as favourited cards, quiz scores and possible deck building features. However, we are still not at that level to implement that. Instead we chose to do a simple register, log in and log out feature for now. We used restdb to store our information 

Loading cards from the api takes some time. Because of that, we decided to implement lottie animations while waiting for the cards to load. This shows the user that the cards are being loaded. 

**User Stories**
1. As a player, I want to find out more about a card that I have encountered during a game of mine so i can devise a strategy to play against that card.

2. As a player, I want to know how to get a specific card back that looks nice and add it to my collection.

3. As a non-player, I want to know whether Hearthstone has nice designs of their cards and card backs that pique my interest in playing the game

4. I wanted to test my knowledge about the cards in hearthstone. 

5. I was unsure if i should open a pack in game or not. Having a pack opening simulator let me gauge and predict the chances of getting a rare card in game.

## Features

### Existing Features
This website offers various features for the user to use. Some of  these features incluse a filtering system where the user is able to chose specifically which class or set a card comes from. Furthurmore, they can even search for card names with the implemented search bar, making finding specific cards much easier. 

Our other features include a quiz where players can test their game knowledge. This quiz will randomly select a card and a question to test the player.

We implemented a pack opening simulator to allow users to test their luck. This might help those that have the itch to open packs but do not wish to spend their hard earned points in game. The pack simulator also helps them decide if they want to open a pack based on their luck on that day.

Other features we have implemented are the accounts feature using restDB. This feature allows users to register an account or log into one if they already registered. 

### Collectible Card Information

Currently the card page only shows information on the collectible cards based on the current patch. Each card, when clicked, will display more details such as its class, card set, etc, of the card as a modal popup.

### CardBack Information

The cardbacks page on this site displays every cardback currently in the game. When clicking on the cardbacks, a popup will appear displaying information about the cardback such as the name, description and how to obtain.

### Features Left to Implement

* Information on all cards in Hearthstone to be displayed in the cards page even if its not a collectible or a playable card.

* As of right now there is not much to do with the accounts feature, however it could be expanded on and can evenbe used to save cards that the user likes, or even save the users quiz scores and packs.

* A scoring system could be added to allow players to know  their score based on how well they did. This can even be tied to their accounts

* Currenty the pack opening simulator only allows 1 type of pack. In the future, more packs could be added to allow users the option of choosing which expansion they would like to open packs from.

## Technologies Used:
* [HTML](https://html.spec.whatwg.org/multipage/)
    * The project uses HTML to create content for the website.
* [CSS](https://www.w3.org/Style/CSS/)
    * The project uses CSS to style the content on the website.
* [JavaScript](https://www.javascript.com/)
    * The project uses Javascript to make the website interactive.
* [JQuery](https://jquery.com/)
    * The project uses JQuery to fetch data from APIs and simplify DOM manipulation.
* [Bootstrap](https://getbootstrap.com/)
    * The project uses Bootstrap to customize and style content
* [RapidAPI](https://rapidapi.com/)
    * The project uses RapidAPI to find a suitable API for data

## Testing

Search for card
1. Go to cards page
    1. type in card name
    2. click search button
    3. Only cards with the same name in the search field will be displayed

2. Card information
    1. Go to cards page
    2. click on a button to start displaying cards
    3. Once cards have been diplayed, click on a card.
    4. A popup should appear containing the image of the card and various information about the card.

4. Registering an account
    1. Go to accounts us page
    2. fill in username, password and confirm password
    3. Click on register button
    4. The page will changed to a logged in page displaying username.

5. Navigation bar Responsiveness
    1. Reduce browser size
    2. menu links should disappear and is replaced by a button
    3. Clicking the button will show a dropdown menu containing the links

6. Quiz page responsive
    1. Go to quiz page
    2. reduce browser size
    3. layout of the quiz will change. Making the card image on top and the quiz questions and answer at the bottom

8. Browsers tested on
    1. Google Chrome
    2. Microsoft Edge
    3. Opera
    4. Internet Explorer

9. Bugs discovered
    1. Some functions on internet explorer was not able to work.
    The image slider and the characters from the javascript did not load.

## Credits

### Content
The information for each card and cardbacks in this site were obtained from this API
* [Cards/CardBacks](https://rapidapi.com/omgvamp/api/hearthstone?endpoint=5525c4a8e4b01d538895c588)

Database used to store accounts information such as username and password
* [Database](https://restdb.io/)


### Media
Image of card back used for quiz and pack opening
- [HearthstoneGamepedia](https://hearthstone.gamepedia.com/Card_back)
Image of the Search Icon
- [Search Icon](https://image.flaticon.com/icons/png/512/49/49116.png)


### Acknowledgements
* We received inspiration for this project from Hearthstone