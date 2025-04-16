"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Tutorial Case

   Author: Christian Bollinger
   Date:   3/31/25
   
   Filename: ag_poker.js

*/
window.addEventListener("load", playDrawPoker);

function playDrawPoker() {
   var dealButton = document.getElementById("dealB");
   var drawButton = document.getElementById("drawB");
   var standButton = document.getElementById("standB");
   var resetButton = document.getElementById("resetB");
   var handValueText = document.getElementById("handValue");
   var betSelection = document.getElementById("bet");
   var bankBox = document.getElementById("bank");

   pokerGame.currentBank = 500;
   pokerGame.currentBet = 25;

   //Create a new deck of cards and shuffle it
   var myDeck = new pokerDeck();
   myDeck.shuffle();
   console.log(myDeck);

   //Create a pokerHandd object
   var myHand = new pokerHand(5);

   bankBox.value = pokerGame.currentBank;
   betSelection.onchange = function(e) {
      pokerGame.currentBet = parseInt(e.target.options[e.target.selectedIndex].value);
   };

      //Restart the game when the Reset button is clicked
   resetButton.addEventListener("click", function() {
      pokerGame.currentBank = 500;
      bankBox.value = pokerGame.currentBank;
      enableObj(dealButton);
      enableObj(betSelection);
      disableObj(drawButton);
      disableObj(standButton);
   });


   //Enable draw and stand after deal
   dealButton.addEventListener("click", function() {
      if (pokerGame.currentBank >= pokerGame.currentBet) {
         disableObj(dealButton);
         disableObj(betSelection);
         enableObj(drawButton);
         enableObj(standButton);
         bankBox.value = pokerGame.placeBet();

         // Deal cards into the poker after confirming
         //there are at least 10 cards in the deck
         if (myDeck.cards.length < 10) {
            myDeck = new pokerDeck();
            myDeck.shuffle();
         }
         myDeck.dealTo(myHand);
         console.log(myDeck, myHand);
         
   } else {
      alert("Reduce the size of your bet");
   }
   });

   //Enable the deal and bet options when hand ends
   drawButton.addEventListener("click", function() {
      enableObj(dealButton);
      enableObj(betSelection);
      disableObj(drawButton);
      disableObj(standButton);
   });

   standButton.addEventListener("click", function() {
      enableObj(dealButton);
      enableObj(betSelection);
      disableObj(drawButton);
      disableObj(standButton);
   });


   //Disable Poker button
   function disableObj(obj) {
      obj.disabled = true;
      obj.style.opacity = 0.25;
   }
   //Enable poker button
   function enableObj(obj) {
      obj.disabled = false;
      obj.style.opacity = 1;
   }
}

console.log(playDrawPoker);