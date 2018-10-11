/**********************************************************************
* Author				: Prakash Chandra Hazari
* Created Date			: 10th October 2018
* Salesforce Hackton 	: 
* Purpose				: Aura enabled server side apex controller to modifymultiple account name,
							delete multiple/ single record , edit selected account record, create new acount
*********************************************************************/
public class ListOFAccountController {
    @AuraEnabled
    public static List<Account> getAccountList(){
        List<Account> returnAccList = new List<Account>();
        List<account> AccList=[SELECT Name,id,AccountNumber,AccountSource,Owner.Alias,CreatedBy.name,Industry,Type,AnnualRevenue FROM Account ORDER BY Name ASC LIMIT 200];
        for(Account ac :AccList){
            returnAccList.add(ac);
        }
        return returnAccList;
    }
    
    @AuraEnabled
    public static String deleteAccRecords(List<String> listIds){
        String msg = '';
        List<Account> accList = [SELECT Id,Name FROM Account WHERE ID IN : listIds];
        List<Account> delAcc = new List<Account>();
        for(Account a:accList){
            delAcc.add(a);
        }
        if(!accList.isEmpty()){
            Database.delete(delACC);
            msg='recordsDeleted';
        }else{
            msg ='noRecodsSelectedfordelete';
        }
        return msg;
    }
    
    @AuraEnabled
    public static String updateACCSource(List<String> listIds, String accountSource){
        system.debug('\n acc source '+accountSource);
        String msg='';
        List<Account> acCUpdate = new List<Account>();
        List<Account> accList =[SELECT Id,Name,AccountSource FROM Account WHERE ID IN : listIds];
        for(Account a: acCList){
            a.AccountSource=accountSource;
            acCUpdate.add(a);
        }
        if(!accList.isEmpty()){
            Database.update(acCUpdate);
            msg='AccountUpdated';
        }
        else{
            msg='somethingWrong';
        }
        return msg;
    }
    
    @AuraEnabled
    public static List<Account> getSelectedACCRec(List<String> listIds){
        return [SELECT Id, Name, Type, Phone, Fax, Website, Parent.Name,Industry, AnnualRevenue, Description, Rating, Site, NumberOfEmployees FROM Account where ID IN:listIds];
    }
    
    @AuraEnabled
    public static Account getDetailsRecord(Id accID){
        return [SELECT Id, Name, Owner.Alias, Type, Phone, AccountNumber,Fax, Website, parentID, Industry, AccountSource, CreatedBy.Name,LastModifiedBy.Name,AnnualRevenue, Description, Rating, Site, NumberOfEmployees FROM Account where ID =:accID];
    }
    
    @AuraEnabled
    public static String createNEWACCOUNT(String accname,String apn,Decimal arevnu,String atype, String abillingStrt,String azipcd){
       String msg ='';
        ID accrecordTypeID = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Customer').getRecordTypeId();
        system.debug('\n account type -> '+atype);
        Account acc = new Account();
        acc.name =accname;
        acc.Phone = apn;
        acc.AnnualRevenue = arevnu;
        acc.Type = atype;
        acc.BillingStreet = abillingStrt;
        acc.BillingPostalCode = azipcd;
        try{
            insert acc;
            msg='recordInserted';
        }
        catch(Exception ex){
            msg= ex.getMessage();
        }
        return msg;
    }
     @AuraEnabled
    public static List<Account> displaySelectedACC (List<String> listIds){
        return [SELECT Id, Name, Owner.Alias, Type, Phone, AccountNumber,Fax, Website, parent.Name, Industry, AccountSource, CreatedBy.Name,LastModifiedBy.Name,AnnualRevenue, Description, Rating, Site, NumberOfEmployees FROM Account where ID IN:listIds];
    }
    
}