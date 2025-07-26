# 전역 툴팁 시스템 사용법

이 시스템은 어디서든 마우스 호버 시 툴팁을 표시할 수 있는 전역 툴팁 시스템입니다.

## 1. 기본 사용법

### React 컴포넌트에서 사용

```jsx
import { useTooltipHandlers } from '../setup/utils/TooltipUtils';

function MyComponent() {
    const tooltipHandlers = useTooltipHandlers('이것은 툴팁 내용입니다', 'top');
    
    return (
        <div {...tooltipHandlers}>
            마우스를 올려보세요
        </div>
    );
}
```

### 전역 함수 사용

```javascript
// 툴팁 표시
window.showTooltip('툴팁 내용', 100, 200, 'top');

// 툴팁 숨기기
window.hideTooltip();
```

### DOM 요소에 직접 추가

```javascript
import { addTooltipToElement } from '../setup/utils/TooltipUtils';

const element = document.getElementById('my-element');
const cleanup = addTooltipToElement(element, '툴팁 내용', 'top');

// 클린업 (컴포넌트 언마운트 시)
cleanup();
```

## 2. 툴팁 위치 옵션

- `'top'` (기본값): 요소 위에 표시
- `'bottom'`: 요소 아래에 표시
- `'left'`: 요소 왼쪽에 표시
- `'right'`: 요소 오른쪽에 표시

## 3. 고급 사용법

### 커스텀 툴팁 내용 생성

```javascript
import { createTooltipContent, useTooltipHandlers } from '../setup/utils/TooltipUtils';

function MyComponent() {
    const content = createTooltipContent(
        '제목',
        '설명 내용',
        '추가 정보'
    );
    
    const tooltipHandlers = useTooltipHandlers(content, 'top');
    
    return (
        <div {...tooltipHandlers}>
            고급 툴팁
        </div>
    );
}
```

### 동적 툴팁

```javascript
function DynamicTooltip() {
    const handleMouseEnter = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        
        // 동적으로 내용 생성
        const content = `현재 시간: ${new Date().toLocaleTimeString()}`;
        window.showTooltip(content, x, y, 'top');
    };
    
    const handleMouseLeave = () => {
        window.hideTooltip();
    };
    
    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            동적 툴팁
        </div>
    );
}
```

## 4. 스타일 커스터마이징

CSS에서 `.globalTooltip` 클래스를 수정하여 툴팁 스타일을 변경할 수 있습니다:

```css
.globalTooltip {
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    max-width: 300px;
    /* 추가 스타일 */
}
```

## 5. 주의사항

- 툴팁은 `pointer-events: none`으로 설정되어 있어 마우스 이벤트를 방해하지 않습니다.
- 툴팁 내용은 HTML을 지원하지만 XSS 공격을 방지하기 위해 신뢰할 수 있는 내용만 사용하세요.
- 툴팁은 화면 경계를 벗어나지 않도록 자동으로 조정됩니다. 