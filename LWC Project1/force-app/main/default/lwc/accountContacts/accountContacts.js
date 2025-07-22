import { LightningElement, wire, api } from 'lwc';
import {MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import AccountContactChannel from '@salesforce/messageChannel/AccountContact__c';
import getAccountContacts from '@salesforce/apex/AccountClass.getAccountContacts';
import LightningConfirm from 'lightning/confirm';
// import { deleteRecord } from 'lightning/uiRecordApi';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountContacts extends LightningElement {
    accountId;
    accountName;
    title = "Contacts";
    contacts;
    hasContacts;
    isAccountSelected = false;
    isAddContactClicked = false;
    isEditContactClicked = false;
    editableContactId;

    @api recordId;
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
                    this.accountId = parameter.Id;
                    this.accountName = parameter.Name;
                    this.title = parameter.Name + "'s Contacts"
                    this.getContacts();
                }
            )
        }
    }

    async getContacts(){
        this.contacts = await getAccountContacts({accountId: this.accountId});
        this.hasContacts = this.contacts.length > 0?true:false;
        this.isAccountSelected = true;
    }

    handleAddContact(event){
        this.isAddContactClicked = true;
    }

    handleAddContactCancel(event){
        this.isAddContactClicked = false;
    }

    handleEditContact(event){
        this.isEditContactClicked = true;
        this.editableContactId = event.target.dataset.contactId
    }

    handleEditContactCancel(event){
        this.isEditContactClicked = false;
    }

    handleSuccess(event){
        this.isAddContactClicked = false;
        this.isEditContactClicked = false;
        this.getContacts();
    }

    async handleDelete(event){
        this.editableContactId = event.target.dataset.contactId;
        const result = await LightningConfirm.open({
            message: 'Are you Sure to Delete?',
            variant: 'headerless',
            label: 'this is the aria-label value',
            // setting theme would have no effect
        });

        if(result){
            let deleteResult = await deleteRecord(this.editableContactId);
            this.getContacts();
            this.showToast();
        }
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Delete Contact',
            message:
                'Contact deleted Successfully.',
        });
        this.dispatchEvent(event);
    }

    handleUnsubscription(){
        unscubscribe(this.subscription);
        this.subscription = null;
    }
}