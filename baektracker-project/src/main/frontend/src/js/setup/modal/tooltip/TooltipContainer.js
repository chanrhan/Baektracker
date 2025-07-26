import React, { useState, useEffect } from 'react';
import styles from '../../../../css/styles.module.css';

let tooltipInstance = null;

export const TooltipContainer = () => {
    const [tooltip, setTooltip] = useState({
        visible: false,
        content: '',
        x: 0,
        y: 0,
        position: 'top' // top, bottom, left, right
    });

    useEffect(() => {
        // 전역 인스턴스 설정
        tooltipInstance = {
            show: (content, x, y, position = 'top') => {
                setTooltip({
                    visible: true,
                    content,
                    x,
                    y,
                    position
                });
            },
            hide: () => {
                setTooltip(prev => ({ ...prev, visible: false }));
            }
        };

        // 전역 함수 등록
        window.showTooltip = tooltipInstance.show;
        window.hideTooltip = tooltipInstance.hide;

        return () => {
            tooltipInstance = null;
            delete window.showTooltip;
            delete window.hideTooltip;
        };
    }, []);

    if (!tooltip.visible) return null;

    const getTooltipStyle = () => {
        const offset = 10;
        let left = tooltip.x;
        let top = tooltip.y;

        switch (tooltip.position) {
            case 'top':
                top = tooltip.y - offset;
                left = tooltip.x;
                break;
            case 'bottom':
                top = tooltip.y + offset;
                left = tooltip.x;
                break;
            case 'left':
                top = tooltip.y;
                left = tooltip.x - offset;
                break;
            case 'right':
                top = tooltip.y;
                left = tooltip.x + offset;
                break;
        }

        return {
            position: 'fixed',
            left: `${left}px`,
            top: `${top}px`,
            zIndex: 9999,
            transform: 'translate(-50%, -100%)'
        };
    };

    return (
        <div className={styles.globalTooltip} style={getTooltipStyle()}>
            {typeof tooltip.content === 'string' ? 
                <div dangerouslySetInnerHTML={{ __html: tooltip.content }} /> : 
                tooltip.content
            }
        </div>
    );
};

// 전역 함수들
export const showTooltip = (content, x, y, position = 'top') => {
    if (tooltipInstance) {
        tooltipInstance.show(content, x, y, position);
    }
};

export const hideTooltip = () => {
    if (tooltipInstance) {
        tooltipInstance.hide();
    }
};

// React Hook
export const useTooltip = () => {
    return {
        showTooltip: (content, x, y, position = 'top') => {
            if (tooltipInstance) {
                tooltipInstance.show(content, x, y, position);
            }
        },
        hideTooltip: () => {
            if (tooltipInstance) {
                tooltipInstance.hide();
            }
        }
    };
}; 