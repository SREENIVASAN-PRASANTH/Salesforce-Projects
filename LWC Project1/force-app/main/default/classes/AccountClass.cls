public with sharing class AccountClass {
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(String searchText){
        try{
            if(String.isEmpty(searchText)){
                return [SELECT Id, Name FROM Account];
            }
            else{
                searchText = '%' + searchText + '%';
                return [SELECT Id, Name FROM Account WHERE Name LIKE :searchText];
            }
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}