export class UserAction {

    /**
     * 
     * @param {Object} e 
     */
    constructor(e) {

        const panel = document.querySelector(".message-panel");

        const div = document.createElement('div');

        div.className = 'channel-info';

        const span = document.createElement("span");

        //span.innerText = 

        if (e.action == "join") {

            if (e.username == "you") {

                span.innerText = 'Vous avez rejoins la discussion' ;
            }
            else {

                span.innerText = `${e.username} a rejoint la discussion`;
            }


        } else {

            span.innerText = `Un Utilisateur a quitter la discussion` ;

        }

        div.append(span);

        panel.append(div);

    }
}