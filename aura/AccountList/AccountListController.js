({
    displayAccountList : function(component, event, helper) {
        console.log("inside conroller JS");
        helper.loadAccountRecords(component);
        
    },
    
    deleteSelected : function(component, event, helper) {
        console.log("inside conroller JS for Delete multiple account");
        var delID =[];
        var getAllID = component.find("chkbx");
        if(! Array.isArray(getAllID)){
            if (getAllID.get("v.value") == true) {
                delID.push(getAllID.get("v.text"));
            }
        }else{
            for (var i = 0; i < getAllID.length; i++) {
                if (getAllID[i].get("v.value") == true) {
                    delID.push(getAllID[i].get("v.text"));
                }
            }
        }
        var mesg ='Please select atleast one account to mass Delete';
        var title ="Warning!";
        if(delID ==''){
            helper.showToast(component,title,mesg,'warning');
        }
        else{
        helper.deleteSelectedHelper(component, event, delID); 
        }
    },
    
    deleteSingleRec : function(component, event, helper){
        console.log('inside displayrec function');
        var ctarget = event.currentTarget;
        var id_str = ctarget.dataset.value;
        console.log("account id --> "+id_str);
        helper.deleteSelectedHelper(component, event, id_str); 
    },
    
    createNewAccount : function(component, event, helper) {
        console.log("inside conroller JS for create new account");
        component.set("v.isCreate",true);
        component.find("editModal").open();
    },
    
    editSelected :  function(component, event, helper) {
        console.log('edit multiple records');
        component.set("v.isCreate",false);
        var delID =[];
        var getAllID = component.find("chkbx");
        if(! Array.isArray(getAllID)){
            if (getAllID.get("v.value") == true) {
                delID.push(getAllID.get("v.text"));
            }
        }else{
            for (var i = 0; i < getAllID.length; i++) {
                if (getAllID[i].get("v.value") == true) {
                    delID.push(getAllID[i].get("v.text"));
                }
            }
        }
        console.log('delid => '+delID);
        var mesg ='Please select atleast one account to Mass Update';
        var title ="Warning!";
        if(delID ==''){
            helper.showToast(component,title,mesg,'warning'); 
        }
        else{
             component.find("editModal").open();
        helper.displaySelectedAccount(component,event, delID);
        }
        
    },
    
    selectAll : function(component,event,helper){
        console.log('selecall checkbox');
        var selectedHeaderCheck = event.getSource().get("v.value");
        var getAllId = component.find("chkbx");
        if(! Array.isArray(getAllId)){
            if(selectedHeaderCheck == true){ 
                component.find("chkbx").set("v.value", true);
            }else{
                component.find("chkbx").set("v.value", false);
            }
        }else{
            if (selectedHeaderCheck == true) {
                for (var i = 0; i < getAllId.length; i++) {
                    component.find("chkbx")[i].set("v.value", true);
                }
            } else {
                for (var i = 0; i < getAllId.length; i++) {
                    component.find("chkbx")[i].set("v.value", false);
                }
            } 
        }  
    },
    
    checkboxSelect: function(component, event, helper) {
        var selectedRec = event.getSource().get("v.value");
        console.log('selected checkbox value -> '+selectedRec);
    },
    
    
    saveAccount : function(component, event, helper){
        console.log('to create new account ');
        helper.createAccount(component);
    },
    
    getAccountSource :function(component, event, helper){
        console.log('getaccount source');
        var selectedValue= component.find("accS").get("v.value");
        console.log('selected value --> '+selectedValue);
        component.set("v.accsource",selectedValue)
    },
    
    getAccountType :function(component, event, helper){
        console.log('getaccount Type');
        var selectedValue= component.find("accTP").get("v.value");
        console.log('selected value --> '+selectedValue);
        component.set("v.accType",selectedValue)
    },
    
    saveDistData :function(component, event, helper){
        console.log('to save data');
       var accsource = component.get("v.accsource");
        console.log('account source -> '+accsource);
        var delID =[];
        var getAllID = component.find("chkbx");
        if(! Array.isArray(getAllID)){
            if (getAllID.get("v.value") == true) {
                delID.push(getAllID.get("v.text"));
            }
        }else{
            for (var i = 0; i < getAllID.length; i++) {
                if (getAllID[i].get("v.value") == true) {
                    delID.push(getAllID[i].get("v.text"));
                }
            }
        }
        helper.updateAccountSource(component, event, delID,accsource); 
    },
    
    editRec :function(component, event, helper){
        console.log('edit rec function');
        var ctarget = event.currentTarget;
        var recID = ctarget.dataset.value;
        console.log("account id --> "+recID);
        component.set("v.accRECID",recID);
        helper.editAccRec(component, event, helper);
    },
    
    displayrec : function(component, event, helper){
        console.log('inside displayrec function');
        var ctarget = event.currentTarget;
        var id_str = ctarget.dataset.value;
        console.log("account id --> "+id_str);
        var action = component.get('c.getDetailsRecord');
        action.setParams({
            'accID' : id_str
        });
        action.setCallback(this,function(resp){
            var state = resp.getState();
            var divClass = component.find("detalilsRec");
            console.log('return state --> '+state);
            console.log('return state #1--> '+resp.getReturnValue());
            if(state === 'SUCCESS'){
                console.log('sucessfully returned from server');
                if(resp.getReturnValue()!=null){
                    console.log('server returned a success msg');
                    $A.util.addClass(divClass, 'slds-show');
                    $A.util.removeClass(divClass, 'slds-hide');
                    component.set("v.AccList",resp.getReturnValue());
                    console.log('server returned a success msg' + component.get("v.AccList"));
                }
                else{
                    console.log('check error id ->' +resp.getReturnValue());
                }
            }
        }),
            $A.enqueueAction(action);
    },
    
    closeEditModal :function(component, event, helper){
        helper.closeEditModal(component, event, helper);
    },
})