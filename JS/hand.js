//hand.js
//
import {player_selected, updateSelected} from './selected.js';
//
export let player_hand;
//
const el_player_hand = document.querySelector("#player-hand");
const el_player_hs1 = document.querySelector("#player-hs1");
const el_player_hs2 = document.querySelector("#player-hs2");
const el_player_hs3 = document.querySelector("#player-hs3");
const el_player_hs4 = document.querySelector("#player-hs4");
const el_player_hs5 = document.querySelector("#player-hs5");
const el_player_hs6 = document.querySelector("#player-hs6");
const el_player_hs7 = document.querySelector("#player-hs7");
const el_player_rowUp = document.querySelector("#hand-row-up");
const el_player_rowDown = document.querySelector("#hand-row-down");
const el_player_rowNum = document.querySelector("#current-row");
//
let player_hand_size = 0;
let player_hand_rows = 1;
let player_current_hand = 1;
let card_sprX = 0;
let card_sprY = -144;
//
//
export class Hand {
    constructor() {
        this.cards = [];
    };

    get cardCount() {
        return this.cards.length
    };

    addToHand(card) {
        this.cards.push(card);
    };

    moveFromHand(card) {
        this.cards.splice(this.cards.indexOf(card), 1);
    };
};
//
export const initializeHand = () => {
    player_hand = new Hand();
    el_player_hs1.addEventListener("click",function(){nodeHandSelect(el_player_hs1,0)});
    el_player_hs2.addEventListener("click",function(){nodeHandSelect(el_player_hs2,1)});
    el_player_hs3.addEventListener("click",function(){nodeHandSelect(el_player_hs3,2)});
    el_player_hs4.addEventListener("click",function(){nodeHandSelect(el_player_hs4,3)});
    el_player_hs5.addEventListener("click",function(){nodeHandSelect(el_player_hs5,4)});
    el_player_hs6.addEventListener("click",function(){nodeHandSelect(el_player_hs6,5)});
    el_player_hs7.addEventListener("click",function(){nodeHandSelect(el_player_hs7,6)});
    el_player_rowUp.addEventListener("click",function(){updateNodeHandrowButton(true)});
    el_player_rowDown.addEventListener("click",function(){updateNodeHandrowButton(false)});
};
//
export const nodeHandSelect = (_element,_index) => {
    ///*
    let _hasCard = _element.classList.contains("card");
    if (_hasCard === true)
    {
        let _isSelected = _element.classList.contains("selected");
        if (_isSelected === true)
        {
            //Remove Select
            let _child = _element.getElementsByClassName("select");
            //console.log(_child[0]);
            _element.removeChild(_child[0]);
            _element.classList.remove("selected");
            player_selected.deselect(player_hand.cards[_index]);
            updateSelected();
        }
        else if (player_selected.cards[4] === undefined)
        {
            //Select Card
            let _selectCard = player_hand.cards[_index];
            player_selected.select(_selectCard);
            updateSelected();
            console.log(_selectCard);
            
            let _selectBorder = document.createElement('div');
            _selectBorder.style.background = "url(..//IMG/spr_card_standard_all.png)";
            _selectBorder.style.backgroundPosition = "-210px -576px";
            _selectBorder.style.border = "none";
            _selectBorder.classList.add("card");
            _selectBorder.classList.add("select");
            _element.appendChild(_selectBorder);
            _element.classList.add("selected");
            
        };
    }
    //*/
    //console.log("end nodeHandSelect");
};
//
export const nodeHandToActive = (_element,_index) => {
    ///*
    //Move to Active HTML
    let _cardIndex = _index + (7 * (player_current_hand - 1))
    let _newActive = player_hand.cards[_cardIndex];
    let _selectSuit = _element.getAttribute("suit");
    let _selectValue = _element.getAttribute("value");
    card_sprY = Object.values(_newActive)[0] * -144;
    card_sprX = (Object.values(_newActive)[1] - 2) * -105;
    el_player_as1.setAttribute("suit",Object.values(_newActive)[0]);
    el_player_as1.setAttribute("value",Object.values(_newActive)[1]);
    el_player_as1.style.background = "url(..//IMG/spr_card_standard_all.png)";
    el_player_as1.style.backgroundPosition = `${card_sprX}px ${card_sprY}px`;
    el_player_as1.classList.add("card");
    //Update Arrays
    player_active.add_to_active(player_hand.cards[_cardIndex]);
    player_hand.move_from_hand(player_hand.cards[_cardIndex]);

    //Update GUI
    update_html_hand();
    //update_html_active();
    //*/
    console.log("end nodeHandToActive")
};
//
export const updateNodeHand = () => {
    ///*
    player_hand_size = player_hand.cards.length;
    player_hand_rows = Math.ceil(player_hand_size/7);
    let _rowString = player_current_hand + "/" + player_hand_rows;
    el_player_rowNum.innerHTML = _rowString;
    for (let i = 0 ; i <= 6; i = i + 1){
        let _cardIndex = i + (7 * (player_current_hand - 1))
        switch(i) {
            case 0:
                updateNodeHandSlot(el_player_hs1,_cardIndex);
                break;
            case 1:
                updateNodeHandSlot(el_player_hs2,_cardIndex);
                break;
            case 2:
                updateNodeHandSlot(el_player_hs3,_cardIndex);
                break;
            case 3:
                updateNodeHandSlot(el_player_hs4,_cardIndex);
                break;
            case 4:
                updateNodeHandSlot(el_player_hs5,_cardIndex);
                break;
            case 5:
                updateNodeHandSlot(el_player_hs6,_cardIndex);
                break;
            case 6:
                updateNodeHandSlot(el_player_hs7,_cardIndex);
                break;
        }
    };
    //*/
    //console.log("end updateNodeHand");
};
//
export const updateNodeHandSlot = (_element,_slotNum) => {
    ///*
    if (player_hand_size > _slotNum)
    {
        let _card = player_hand.cards[_slotNum];
        card_sprY = Object.values(_card)[0] * -144;
        card_sprX = (Object.values(_card)[1] - 2) * -105;
        _element.setAttribute("suit",Object.values(_card)[0]);
        _element.setAttribute("value",Object.values(_card)[1]);
        _element.style.background = "url(..//IMG/spr_card_standard_all.png)";
        _element.style.backgroundPosition = `${card_sprX}px ${card_sprY}px`;
        _element.style.border = "none";
        _element.classList.add("card");
        player_hand_size = player_hand.cards.length;
        if (player_hand_size === 0) {
            el_player_hand.innerHTML = "";
        };
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
    //*/
   //console.log("end updateNodeHandSlot")
};
//
export const updateNodeHandrowButton = (_rowUp) => {
    /*
    let _dirUp = _rowUp;
    console.log(_dirUp);
    player_hand_rows = Math.ceil(player_hand_size/7);
    if (_dirUp === true){
        player_current_hand = player_current_hand + 1;
        if (player_current_hand > player_hand_rows)
        {
            player_current_hand = 1;
        }
    }
    else{
        player_current_hand = player_current_hand - 1;
        if (player_current_hand < 1)
        {
            player_current_hand = player_hand_rows;
        }
    }
    let _rowString = player_current_hand + "/" + player_hand_rows;
    el_player_rowNum.innerHTML = _rowString;
    update_html_hand();
    */
   console.log("end updateNodeHandrowButton");
};
