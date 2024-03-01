export const showDeliveryAddressReducer = (state=false, action) =>{
    switch(action.type){
        case "SHOW_ADDRESS_FORM" :
            return true;
        case "HIDE_ADDRESS_FORM" :
            return false;
        default :
            return state;
    }
}