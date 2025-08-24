export const MouseEventUtils = {
    getAbsolutePos: (e: MouseEvent<HTMLButtonElement>)=>{
        return {
            top: window.pageYOffset + e.currentTarget.getBoundingClientRect().top,
            left: window.pageXOffset + e.currentTarget.getBoundingClientRect().left
        }
    },
    attachDragAndDropEvent: (list, dragClassName)=>{
        if(!list){
            return;
        }
        let currentItemIndex = null;
        let draggingItem = null;

        list.addEventListener('dragstart', (e) => {
            console.log(e.target)
            if(!e.target.classList.contains(dragClassName)){
                e.preventDefault();
                return;
            }
            console.log('drag start')
            draggingItem = e.target.closest("li")
            const listArr = [...draggingItem.parentElement.children];
            console.log(e.target)
            currentItemIndex = listArr.indexOf(draggingItem);
        });

        list.addEventListener('dragover', (e) => {
            if(!draggingItem){
                return;
            }
            e.preventDefault();
        });

        list.addEventListener('drop', (e) => {
            if(!draggingItem){
                return;
            }
            e.preventDefault();

            const currentDropItem = e.target.closest("li")
            console.table(currentDropItem)
            const listArr = [...draggingItem.parentElement.children];
            const dropItemIndex = listArr.indexOf(currentDropItem);

            if (currentItemIndex < dropItemIndex) {
                currentDropItem.after(draggingItem);
            } else {
                currentDropItem.before(draggingItem);
            }
        });
    }
}