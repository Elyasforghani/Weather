import { useEffect, useState } from "react"



const useFetch = (url)=>{
    const [data,setData]=useState(null)
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        if (!url) return; 
        setLoading(true)

        const delayDebounce=setTimeout(()=>{
            fetch(url).then(res=>res.json().then(para=>{setData(para);setLoading(false);})
        ).catch((err)=>{
            console.log("error while fetching",err);
            setLoading(false);
            
        });
        },500)
      return ()=>clearTimeout(delayDebounce);

    },[url])
    return {data,loading}
}

export default useFetch