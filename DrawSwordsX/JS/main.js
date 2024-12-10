//main.js
//
import {initializeDeck} from './deck.js';
import {initializeHand} from './hand.js';
import {initializeActive} from './active.js';
import {initializeSelected} from './selected.js';
import {initializeDiscard} from './discard.js';
//import {Deck, Hand, Active, Card, Selected} from './player.js';
//import {draw_card,update_html_hand,update_html_hand_slot,update_html_hand_rowButton} from './hand.js';
//

let card_sprX = 0;
let card_sprY = -144;

//Initialize
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete"){
        console.log("game ready");
        initialize(); //activate interactive elements
    }
});
//
const initialize = () => {
    initializeDeck();
    initializeHand();
    initializeActive();
    initializeSelected();
    //initializeDiscard();
}



