export const ScrollUtils = {
    preventScroll: (target)=>{
        if(!target || !target.style){
            return null;
        }
        const currentScrollY = window.scrollY;
        target.style.position = 'fixed';
        target.style.width = '100%';
        target.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
        target.style.overflowY = 'scroll';
        return currentScrollY;
    },
    allowScroll: (target, prevScrollY: number)=> {
        if (!target || !target.style) {
            return;
        }

        target.style.position = '';
        target.style.width = '';
        target.style.overflowY = 'auto';
        target.style.top = ``
        if (prevScrollY) {
            window.scrollTo(0, prevScrollY);
        }
    }
}