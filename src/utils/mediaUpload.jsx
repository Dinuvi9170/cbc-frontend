import supabase from './supabase';

export default function mediaupload(file){
    const uploadpromise= new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject("No file uploaded")
            }
            
            const timestamp= new Date().getTime();
            const newname= file.name+ timestamp;

            supabase.storage.from('images').upload(newname,file,{
                upsert:false,
                cacheControl:'3600'
            }).then(()=>{
                const publicUrl= supabase.storage.from('images').getPublicUrl(newname).data.publicUrl
                resolve(publicUrl);
            }).catch((e)=>{reject("error occured in supabase connection")
                console.log(e);
            })
        }
    )
    return uploadpromise;
}