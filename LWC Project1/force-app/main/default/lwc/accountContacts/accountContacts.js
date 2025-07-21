import { LightningElement, wire } from 'lwc';
import {MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import AccountContactChannel from '@salesforce/messageChannel/AccountContact__c';

export default class AccountContacts extends LightningElement {
    currentId;
    currentName;
    title;
    subscription = null;

    @wire (MessageContext) messageContext;

    connectedCallback(){
        this.handleSubscription();
    }

    disconnectedCallback(){
        this.handleUnsubscription();
    }

    handleSubscription(){
        if(!this.subscription){
            this.subscription = subscribe(this.messageContext, AccountContactChannel,
                (parameter) => {
                    this.currentId = parameter.Id;
                    this.currentName = parameter.Name;
                    this.title = parameter.Name + "'s Contacts"
                }
            )
        }
    }

    handleUnsubscription(){
        unscubscribe(this.subscription);
        this.subscription = null;
    }
}