/**
 * Elle permet de gerer le button Link (Afficher ou Masquer le contenue) ;
 */

export class Links {


    static #links = document.querySelector(".link-menu") ;

       constructor() {

            if (this.#isHide) {

                Links.#links.classList.remove("hide-menu") ;
            } else {

                Links.#links.classList.add("hide-menu") ;
            }
       }

    get #isHide() {

        if (Array.from(Links.#links.classList).includes("hide-menu")) {

            return true ;
        }

        return false ;
    }

}