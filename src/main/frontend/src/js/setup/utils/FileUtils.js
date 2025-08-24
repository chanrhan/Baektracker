import imageCompression from "browser-image-compression";
import * as XLSX from "xlsx";
import {ModalType} from "../common/modal/ModalType";


export const FileUtils = {
    encodeFileToBase64 : async (fileList: Array<File>)=>{
        const encodingFiles = fileList.map(async (file)=>{
            if(!file){
                return null;
            }
            // if(file.size > 512 * 512){
            //     console.log('compressed!')
            //     file = await FileUtils.compressImage(file)
            // }
            const reader = new FileReader();
            reader.readAsDataURL(file)
            return new Promise((resolve)=>{
                reader.onload = ()=>{
                    resolve(reader.result)
                }
            })
        });

        return await Promise.all(encodingFiles);
    },
    compressImage: async (file: File)=>{
        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 512,
            useWebWorker: true
        }
        try{
            return await imageCompression(file, options);
        }catch (e){
            console.log(e);
            throw new Error("[Error] Image Compressing");
        }
    },
    readXLSX: (data)=> {
        const readData = new Uint8Array(data);
        return XLSX.read(readData, {
            type: 'array',
            bookVBA: true,
            // raw: true
        })
    }
}
