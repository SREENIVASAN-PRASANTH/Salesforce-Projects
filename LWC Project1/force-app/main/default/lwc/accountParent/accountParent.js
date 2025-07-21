import { LightningElement } from 'lwc';

export default class AccountParent extends LightningElement {
    searchTextParent = "";

    handleSearchText(event){
        this.searchTextParent = event.detail;
    }
}