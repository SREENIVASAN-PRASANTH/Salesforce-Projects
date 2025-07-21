import { LightningElement, wire } from 'lwc';
import { MessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import Practice from "@salesforce/messageChannel/Practice__c";

export default class SubscriberComponent extends LightningElement {
    inputMessage = "";
    subscription = null;

    @wire (MessageContext) messageContext;

    connectedCallback(){
        this.handleSubscribe();
    }

    disconnectedCallback(){
        this.handleUnsubscribe();
    }

    handleSubscribe(){
        if (!this.subscription){
            this.subscription = subscribe(this.messageContext, Practice, 
                (parameter) =>{
                    this.inputMessage = parameter.inputMessage;
                } )
        }
    }

    handleUnsubscribe(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}