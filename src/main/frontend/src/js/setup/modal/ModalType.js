export const ModalType = {
    LAYER: {
        // common
        Image_Preview: 'ImagePreview',

        Confirm: 'Confirm',

        SolvedDetail: 'SolvedDetail',
        WeeklyProblemDetail: 'WeeklyProblemDetail',
        Recipe: 'Recipe'
    },
    MENU: {
        Test: 'MenuModalTest',
        Select_Date: 'SelectDate',
        Dynamic_Select: 'DynamicSelect',
        More_Option: 'MoreOption',
        Confirm: 'Confirm',
    },
    SNACKBAR: {
        Alert: 'Alert',
        Warn: 'Warning',
        Info: 'Info',

    },
    TOAST: {

    },
    TOOLTIP: {
        Hint: 'Hint'
    },
    getType: (modalName)=>{
        for(const type in ModalType){
            if(typeof ModalType[type] === 'object'){
                for(const name in ModalType[type]){
                   if(ModalType[type][name] === modalName){
                       return type;
                   }
                }
            }
        }
        return null;
    }
}
