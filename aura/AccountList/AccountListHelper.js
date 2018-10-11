({
    loadAccountRecords : function(component) {
        console.log("inside helper method ->");
        var action = component.get('c.getAccountList');
        action.setCallback(this, function(resp){
            var state = resp.getState();
            console.log('state --> '+state);
            console.log('return values  --> '+resp.getReturnValue());
            if(state === "SUCCESS"){
                component.set('v.Accounts',resp.getReturnValue());
            }
            console.log('acc list --. '+component.get('v.Accounts'));
        });
        $A.enqueueAction(action);
    },
    
    deleteSelectedHelper :function(component, event, deleteRecordsIds){
        var action = component.get('c.deleteAccRecords');
        action.setParams({
            'listIds' :deleteRecordsIds
        });
        action.setCallback(this,function(resp){
            var state = resp.getState();
            var title ="Success!";
            var message ='Deleted successfully!';
            
            console.log('return state --> '+state);
            console.log('return state #1--> '+resp.getReturnValue());
            if(state === 'SUCCESS'){
                console.log('sucessfully returned from server');
                if(resp.getReturnValue()=='recordsDeleted'){
                    console.log('server returned a success msg');
                   this.showToast(component,title,message,'success');   
                }
                else{
                    console.log('check error id ->' +resp.getReturnValue());
                }
                this.loadAccountRecords(component);
            }
        }),
            $A.enqueueAction(action);
    },
    editAccRec :function(component, event, helper){
    var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": component.get("v.accRECID")
        });
        editRecordEvent.fire();
        this.loadAccountRecords(component);
	},
    
    doRefresh :function(component, event, helper){
        console.log('refresh method');
        $A.get('e.force:refreshView').fire();
    },
    
    createAccount : function(component){
        console.log('create new account helper method');
        var accountName = component.get("v.accountName");
        var aphone = component.get("v.aphone");
        var arevenue = component.get("v.arevenue");
        var accType = component.get("v.accType");
        var abillingStreet = component.get("v.abillingStreet");
        var AzipCode = component.get("v.AzipCode");
        
        var action = component.get('c.createNEWACCOUNT');
        action.setParams({
            'accname' : accountName,
            'apn' : aphone,
            'arevnu' : arevenue,
            'atype' : accType,
            'abillingStrt' : abillingStreet,
            'azipcd' : AzipCode
        });   
        action.setCallback(this,function(resp){
            var state = resp.getState();
            console.log('return state --> '+state);
            console.log('return state #1--> '+resp.getReturnValue());
            var title ="Success!";
            var message ='Account created Successfuly !';
            if(state === 'SUCCESS'){
                console.log('sucessfully returned from server');
                if(resp.getReturnValue()=='recordInserted'){
                    console.log('server returned a success msg');
                    this.showToast(component,title,message,'success');    
                }
                else{
                    console.log('check error id ->' +resp.getReturnValue());
                }
                this.loadAccountRecords(component);
                this.closeEditModal(component);
            }
        }),
            $A.enqueueAction(action);
    },
    
    updateAccountSource :function(component, event, deleteRecordsIds, accsource){
        console.log('account source -> '+accsource);
        var action = component.get('c.updateACCSource');
        action.setParams({
            'listIds' :deleteRecordsIds,
            'accountSource' :accsource         
        });
        action.setCallback(this,function(resp){
            var state = resp.getState();
            console.log('return state --> '+state);
            console.log('return state #1--> '+resp.getReturnValue());
            if(state === 'SUCCESS'){
                console.log('sucessfully returned from server');
                if(resp.getReturnValue()=='AccountUpdated'){
                    console.log('server returned a success msg');
                }
                else{
                    console.log('check error id ->' +resp.getReturnValue());
                }
                this.loadAccountRecords(component);
                this.closeEditModal(component);
            }
        }),
            $A.enqueueAction(action);
        
    },
    displaySelectedAccount : function(component, event, deleteRecordsIds){
         var action = component.get('c.displaySelectedACC');
        action.setParams({
            'listIds' :deleteRecordsIds        
        });
         action.setCallback(this,function(resp){
            var state = resp.getState();
            console.log('return state --> '+state);
            console.log('return state #1--> '+resp.getReturnValue());
            if(state === 'SUCCESS'){
                console.log('sucessfully returned from server');
                if(resp.getReturnValue()!=''){
                    console.log('server returned a success msg');
                    component.set("v.displayRec",resp.getReturnValue());
                }
                else{
                    console.log('check error id ->' +resp.getReturnValue());
                }
            }
        }),
            $A.enqueueAction(action);
        
    },
    
    closeEditModal :function(component, event, helper){
        console.log('close modal');
        component.find("editModal").close();
    },
     showToast  : function(component,title,message,type){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "type": type,
            "message": message,
            "duration": '5000'
        });
        toastEvent.fire();        
    },
})