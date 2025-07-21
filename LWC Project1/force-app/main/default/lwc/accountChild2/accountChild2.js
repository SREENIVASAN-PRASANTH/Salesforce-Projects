import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountClass.getAccounts';

import AccountContactChannel from '@salesforce/messageChannel/AccountContact__c';
import { MessageContext, publish } from 'lightning/messageService';

export default class AccountChild2 extends LightningElement {
    @api searchTextChild2;

    @wire (MessageContext) messageContext;

    columns = [
    {label: "Id", fieldName: "Id"},
    {label: "Name", fieldName: "Name"},
    {label: "Action", fieldName: "Action", type: "button", 
        typeAttributes: {label: "View Contacts", value: "view_contacts"}
    }
    ]

    // rows = [
    //     {Id: 1, Name: "Prasanth"},
    //     {Id: 2, Name: "Mohan"},
    //     {Id: 3, Name: "Abi Sankar"}
    // ]

    currentId;
    currentName;
    // currentStatus;

    handleRowAction(event){
        if(event.detail.action.value == "view_contacts"){
            this.currentId = event.detail.row.Id;
            this.currentName = event.detail.row.Name;

            let payload = {Id: this.currentId, Name: this.currentName};
            publish(this.messageContext, AccountContactChannel, payload);
        }

        // if(event.detail.action.value == "Approved"){
        //     this.currentStatus = "Approved";
        // }
    }

    @wire(getAccounts, {searchText: "$searchTextChild2"}) accountRecords;
}