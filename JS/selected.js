//selkected.js
//
import {player_active,updateNodeActive} from './active.js';
import {player_hand,nodeHandDeselectAll,updateNodeHand} from './hand.js';
//
export let player_selected;
//
const el_player_ss1 = document.querySelector("#player-ss1");
const el_player_ss2 = document.querySelector("#player-ss2");
const el_player_ss3 = document.querySelector("#player-ss3");
const el_player_ss4 = document.querySelector("#player-ss4");
const el_player_ss5 = document.querySelector("#player-ss5");
const el_player_sb = document.querySelector('#player-sb');
const el_player_select = document.querySelector("#player-select");
let card_sprX = 0;
let card_sprY = -144;
let select_amount = 0;
let select_script_id = 0;
//
export class Selected {
    constructor(){
        this.cards = [];
        this.cards[0] = undefined;
        this.cards[1] = undefined;
        this.cards[2] = undefined;
        this.cards[3] = undefined;
        this.cards[4] = undefined;
    };

    select(card) {
        console.log("Card Selected");
        for (let i = 0; i < 5; i = i + 1)
        {
            if (this.cards[i] === undefined)
            {
                this.cards[i] = card;
                break;
            };
        };
    };

    deselect(card) {
        console.log("Card Deselected");
        this.cards.splice(this.cards.indexOf(card), 1);
    };
};
//
export const initializeSelected = () => {
    player_selected = new Selected();
    el_player_sb.addEventListener("click",function(){selectButtonActivate()},false);
    console.log("Selected Initialized");
}
//
export const updateSelected = () => {
    for (let i = 0; i < 5; i = i + 1)
    {
        let _cardIndex = i
        switch(i) {
            case 0:
                updateNodeSelectSlot(el_player_ss1,_cardIndex);
                break;
            case 1:
                updateNodeSelectSlot(el_player_ss2,_cardIndex);
                break;
            case 2:
                updateNodeSelectSlot(el_player_ss3,_cardIndex);
                break;
            case 3:
                updateNodeSelectSlot(el_player_ss4,_cardIndex);
                break;
            case 4:
                updateNodeSelectSlot(el_player_ss5,_cardIndex);
                break;
        }
    }
    checkSelectOptions();
    //Buttons for options
};
//
const updateNodeSelectSlot = (_element,_slotNum) => {
    _element.style.top = `${8 + 30 * _slotNum}px`
    if (player_selected.cards[_slotNum] != undefined)
    {
        let _card = player_selected.cards[_slotNum];
        card_sprY = Object.values(_card)[0] * -144;
        card_sprX = (Object.values(_card)[1] - 2) * -105;
        _element.setAttribute("suit",Object.values(_card)[0]);
        _element.setAttribute("value",Object.values(_card)[1]);
        _element.style.background = "url(..//IMG/spr_card_standard_all.png)";
        _element.style.backgroundPosition = `${card_sprX}px ${card_sprY}px`;
        _element.style.border = "none";
        _element.classList.add("card");
    }
    else
    {
        _element.setAttribute("suit",null);
        _element.setAttribute("value",null);
        _element.style.background = "url(..//IMG/spr_card_standard_all.png)";
        _element.style.backgroundPosition = "-1728px -576px";
        _element.style.border = "none";
        _element.classList.remove("card"); 
    };
};

const checkSelectOptions = () => {
    updateSelectAmount();
    if (select_amount === 1)
    {
        if (player_active.cards[0] === undefined)
        {
            el_player_sb.classList.remove("button-off");
            el_player_sb.classList.add("button-on");
            el_player_sb.innerHTML = "ENTER";
            select_script_id = 0;
        }
        else
        {
            el_player_sb.classList.remove("button-on");
            el_player_sb.classList.add("button-off");
            //el_player_sb.removeEventListener("click");
            el_player_sb.innerHTML = "";
        };
    }
    else
    {
        el_player_sb.classList.remove("button-on");
        el_player_sb.classList.add("button-off");
        el_player_sb.innerHTML = "";
    }
};

const updateSelectAmount = () => {
    select_amount = 0;
    for (let i = 0; i < 5; i = i + 1)
    {
        if (player_selected.cards[i] != undefined)
        {
            select_amount = select_amount + 1;
        }
    }
}
//
const selectButtonActivate = () => {
    switch (select_script_id){
        case 0:
            console.log("Enter Button");
            el_player_sb.classList.remove("button-on");
            el_player_sb.classList.add("button-off");
            //Update JS
            player_active.addToActive(player_selected.cards[0]);
            player_hand.moveFromHand(player_selected.cards[0]);
            player_selected.deselect(player_selected.cards[0]);
            //update HTML and CSS
            updateNodeActive();
            updateNodeHand();
            updateSelected();
            nodeHandDeselectAll();
            //console.log(player_active);
            el_player_sb.innerHTML = "";
        break;
        case 1:
            console.log("Place Button");
        break;
        default:
            console.log("Default");
    }
    
};
