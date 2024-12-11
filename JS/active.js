//active.js
//
export let player_active
//
const el_player_as1 = document.querySelector("#player-as1");
const el_player_as2 = document.querySelector("#player-as2");
const el_player_as3 = document.querySelector("#player-as3");
const el_player_as4 = document.querySelector("#player-as4");
const el_player_as5 = document.querySelector("#player-as5");
const el_player_as6 = document.querySelector("#player-as6");
//
export class Active {
    constructor(){
        this.cards = [];
        this.cards[0] = undefined;
        this.cards[1] = undefined;
        this.cards[2] = undefined;
        this.cards[3] = undefined;
        this.cards[4] = undefined;
        this.cards[5] = undefined;
    };

    addToActive(card){
        this.cards[0] = card;
    };

    moveSelectedForward(_slotNum){
        let _newSlot = _slotNum + 1; 
        console.log(this.cards[_newSlot])
        if (this.cards[_newSlot] === undefined && _newSlot <= 5)
        {
            console.log(_newSlot);
            const _selectCard = this.cards[_slotNum]
            this.cards[_newSlot] = _selectCard;
            this.cards[_slotNum] = undefined;
        };
    };
};
//
export const initializeActive = () => {
    player_active = new Active();
    el_player_as1.addEventListener("click",function(){move_active_forward(el_player_as1,0)});
    el_player_as2.addEventListener("click",function(){move_active_forward(el_player_as2,1)});
    el_player_as3.addEventListener("click",function(){move_active_forward(el_player_as3,2)});
    el_player_as4.addEventListener("click",function(){move_active_forward(el_player_as4,3)});
    el_player_as5.addEventListener("click",function(){move_active_forward(el_player_as5,4)});
};
//
const moveActiveForward = (_element,_slotNum) => {
    console.log("Move Active Forward");
    player_active.move_selected_forward(_slotNum);
    update_html_active();
};
//
export const updateNodeActive = () => {
    console.log("Player Active HTML Updated");
    for (let i = 0 ; i <= 5; i = i + 1){
        switch(i) {
            case 0:
                updateNodeActiveSlot(el_player_as1,0);
                break;
            case 1:
                updateNodeActiveSlot(el_player_as2,1);
                break;
            case 2:
                updateNodeActiveSlot(el_player_as3,2);
                break;
            case 3:
                updateNodeActiveSlot(el_player_as4,3);
                break;
            case 4:
                updateNodeActiveSlot(el_player_as5,4);
                break;
            case 5:
                updateNodeActiveSlot(el_player_as6,5);
                break;
        }
    };
};
//
const updateNodeActiveSlot = (_element,_slotNum) => {
    if (player_active.cards[_slotNum] != undefined)
    {
        let _card = player_active.cards[_slotNum];
        let _cardSprY = Object.values(_card)[0] * -144;
        let _cardSprX = (Object.values(_card)[1] - 2) * -105;
        _element.setAttribute("suit",Object.values(_card)[0]);
        _element.setAttribute("value",Object.values(_card)[1]);
        _element.style.background = "url(..//IMG/spr_card_standard_all.png)";
        _element.style.backgroundPosition = `${_cardSprX}px ${_cardSprY}px`;
        _element.style.border = "none";
        _element.classList.add("card");
        /*
        player_hand_size = player_hand.cards.length;
        if (player_hand_size === 0) {
            el_player_hand.innerHTML = "";
        };
        */
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