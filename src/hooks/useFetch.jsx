import { useEffect, useState } from "react"
import axiosinstance from "../config/axiosinstance";


const useFetch =(url)=>{
   const [data, setData]=useState();
   const [isLoading,setIsLoading]=useState(true);
   const [error , setError]=useState(null)
   
   const fetchData = async () => {
    try {
      const response = await axiosinstance({
        method: "GET",
        url: url,
      });
      console.log("API Response:", response.data);


      // Adjust based on what your backend sends
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return [data,isLoading,error];
}

export default useFetch