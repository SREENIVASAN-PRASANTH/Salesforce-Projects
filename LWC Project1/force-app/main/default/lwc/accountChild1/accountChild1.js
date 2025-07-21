import { LightningElement } from 'lwc';

export default class AccountChild1 extends LightningElement {
    searchTextChild1 = "";

    handleChange(event){
        this.searchTextChild1 = event.target.value;
    }

    handleClick(event){
        const searchTextEvent = new CustomEvent("searchevent", {detail : this.searchTextChild1});
        this.dispatchEvent(searchTextEvent);
    }
}