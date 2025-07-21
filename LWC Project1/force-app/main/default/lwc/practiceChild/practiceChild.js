import { LightningElement } from 'lwc';

export default class PracticeChild extends LightningElement {
    firstName = "";
    lastName = "";

    handleFirstNameChange(event){
        this.firstName = event.target.value;
    }

    handleLastNameChange(event){
        this.lastName = event.target.value;
    }

    handleClick(event){
        
        const sendMessageEvent = new CustomEvent("message", 
            {detail:
                {
                    FirstName: this.firstName,
                    LastName: this.lastName
                }});
        this.dispatchEvent(sendMessageEvent);
    }
}