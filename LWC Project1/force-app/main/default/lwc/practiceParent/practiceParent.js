import { LightningElement } from 'lwc';

export default class PracticeParent extends LightningElement {
    firstName = "";
    lastName = "";

    handleChange(event){
        
        this.firstName = event.detail.FirstName;
        this.lastName = event.detail.LastName;
    }
}