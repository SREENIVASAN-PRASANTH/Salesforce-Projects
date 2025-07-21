import { MessageContext, publish} from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import Practice from "@salesforce/messageChannel/Practice__c";

export default class PublisherComponent extends LightningElement {
    inputMessage;

    @wire (MessageContext) messageContext;

    handleChange(event){
        this.inputMessage = event.target.value;
    }

    handleClick(event){
        let payload = {inputMessage: this.inputMessage};
        publish(this.messageContext,Practice,payload);
    }
}