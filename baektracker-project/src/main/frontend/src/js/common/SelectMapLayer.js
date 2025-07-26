import {useRenderlessModal} from "../setup/hook/useRenderlessModal";
import {ObjectUtils} from "../setup/utils/ObjectUtil";

export function SelectMapLayer({initValue, inputField, cssModule, cssModules=[], className, name, value, onChange, values, children}){
    const renderlessModal = useRenderlessModal(`RDL_MAP_${name}`)

    const handleChange = i=>{
        if(onChange){
            onChange(i);
        }else{
            inputField.put(name, i);
        }
        renderlessModal.close();
    }

    const fromCssModule = key=>{
        if(!ObjectUtils.isEmpty(cssModule)){
            return cssModule[key]
        }
        if(ObjectUtils.isEmpty(cssModules)){
            return ''
        }
        if(cssModules && !Array.isArray(cssModules)){
            return cssModules[key];
        }
        if(cssModules.length === 1){
            return cssModules[0][key];
        }

        return cssModules.map(cm=>cm[key]).join(' ');
    }

    // console.log(inputField.get(name))
    // console.log(`value: ${value}`)

    const getButtonName = ()=>{
        if(!ObjectUtils.isEmpty(value)){
            return value;
        }else if(!ObjectUtils.isEmpty(inputField)) {
            const getValue = inputField.get(name);
            // console.log(`g v : ${getValue}`)
            return !ObjectUtils.isEmpty(getValue) ? values[getValue] : (initValue ?? 'NULL')
        }
        return 'NULL'
    }


    if(ObjectUtils.isEmpty(values)){
        return null;
    }

    // if(!value && !inputField && typeof inputField !== "object" || ObjectUtils.isEmpty(values)){
    //     return null;
    // }

    return (
        <>
            <button type="button" className={`select_btn ${fromCssModule('select_btn')}`}
                    onClick={renderlessModal.clickToOpen}>{getButtonName()}</button>
            <ul ref={renderlessModal.ref} className={`select_layer ${fromCssModule('select_layer')} 
            ${className} ${renderlessModal.active && `active ${fromCssModule('active')}`}`}>
                {
                    values && Object.keys(values).map((key, i) => {
                        return <li key={i} className={`select_item ${fromCssModule('select_item')}`}>
                            <button type="button" onClick={() => {
                                handleChange(key);
                                renderlessModal.close()
                            }}>{values[key]}</button>
                        </li>
                    })
                }
            </ul>
        </>
    )
}