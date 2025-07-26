import { showTooltip, hideTooltip } from '../modal/tooltip/TooltipContainer';

/**
 * 요소에 툴팁 이벤트를 추가하는 함수
 * @param {HTMLElement} element - 툴팁을 표시할 요소
 * @param {string} content - 툴팁 내용
 * @param {string} position - 툴팁 위치 ('top', 'bottom', 'left', 'right')
 */
export const addTooltipToElement = (element, content, position = 'top') => {
    if (!element || !content) return;

    const handleMouseEnter = (e) => {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        
        showTooltip(content, x, y, position);
    };

    const handleMouseLeave = () => {
        hideTooltip();
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // 클린업 함수 반환
    return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
    };
};

/**
 * React 컴포넌트에서 사용할 수 있는 툴팁 이벤트 핸들러
 * @param {string} content - 툴팁 내용
 * @param {string} position - 툴팁 위치
 * @returns {object} - onMouseEnter, onMouseLeave 핸들러
 */
export const useTooltipHandlers = (content, position = 'top') => {
    const handleMouseEnter = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        
        showTooltip(content, x, y, position);
    };

    const handleMouseLeave = () => {
        hideTooltip();
    };

    return {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
    };
};

/**
 * 커스텀 툴팁 내용을 동적으로 생성하는 함수
 * @param {string} title - 툴팁 제목
 * @param {string} description - 툴팁 설명
 * @param {string} additionalInfo - 추가 정보
 * @returns {string} - HTML 형태의 툴팁 내용
 */
export const createTooltipContent = (title, description = '', additionalInfo = '') => {
    let content = `<div style="font-weight: bold; margin-bottom: 4px;">${title}</div>`;
    
    if (description) {
        content += `<div style="margin-bottom: 4px;">${description}</div>`;
    }
    
    if (additionalInfo) {
        content += `<div style="font-size: 12px; opacity: 0.8;">${additionalInfo}</div>`;
    }
    
    return content;
};

/**
 * 전역 툴팁 함수들을 window 객체에 등록
 */
export const registerGlobalTooltip = () => {
    window.addTooltipToElement = addTooltipToElement;
    window.useTooltipHandlers = useTooltipHandlers;
    window.createTooltipContent = createTooltipContent;
    window.showTooltip = showTooltip;
    window.hideTooltip = hideTooltip;
}; 