import { Controller } from "@hotwired/stimulus"
import {enter, leave, toggle} from 'el-transition'

export default class extends Controller {
    static targets = ["openUserMenu", "dropdown"]

    connect(){
        console.log("enter:", enter);
        this.openUserMenuTarget.addEventListener('click', (e)=>{
            opendropdown(this.dropdownTarget)
        })
    }
}
function opendropdown(element) {
    toggle(element).then(() => {
        console.log("Enter transition complete")
    })
}
 
function closedropdown() {
    leave(this.dropdownTarget).then(() => {
        element.destroy();
    })
}