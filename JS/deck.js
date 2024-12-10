//deck.js
//
//
import {player_hand, updateNodeHand} from './hand.js';
//
export let player_deck;
//
const SUITS = [0,1,2,3];
const VALUES = [2,3,4,5,6,7,8,9,10,11,12,13,14];
const el_player_deck = document.querySelector("#player-deck");
//
//
export class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    };
};
//
export class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    };
    get cardCount() {
        return this.cards.length
    };

    drawFromDeck() {
        return this.cards.shift()
    };

    returnToDeck(card) {
        this.cards.push(card)
    };

    shuffle() {
        for (let i = this.cardCount - 1; i > 0; i = i - 1){
            const newIndex =  Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        };
    };
};
//
export const initializeDeck = () => {
    player_deck = new Deck();
    player_deck.shuffle();
    el_player_deck.addEventListener("click",function(){drawCard(player_hand)},false);
};
//
export const drawCard = () => {
    let _drawnCard = player_deck.drawFromDeck();
    player_hand.addToHand(_drawnCard);
    updateNodeHand();
    //console.log(player_deck);
    //console.log(player_hand);
    //console.log("Draw From Deck");
};
//
export function freshDeck(){
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit,value)
        })
    })
};