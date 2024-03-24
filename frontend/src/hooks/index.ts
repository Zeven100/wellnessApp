import { BACKEND_URL } from "../../config";
import { useState,useEffect } from "react";
import axios from "axios";

export interface BlogType {
    "id" : number;
    
    "title" : string ;
    "content" : string ;
    "author" : {
        "name" : string
    }
    "Date" : number ;
    "Month" : number ;
    "Year" : number ;
    
}
export const  useBlog = ({ id } : {id : number}) => {
    const [loading ,  setLoading] = useState(true) ;
    const [blog , setBlog ] = useState<BlogType>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk/${id}`,{
            headers : {
                Authorization : localStorage.getItem("token") 
            }
        })
        .then(res => {
            setBlog(res.data.blog);
            setLoading(false);
        })
    },[id])
    return {
        loading , blog
    } ; 
}

export const useBlogs = () => {
    const [loading ,  setLoading] = useState(true) ;
    const [blogs , setBlogs ] = useState<BlogType[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers : {
                Authorization : localStorage.getItem("token") 
            }
        })
        .then(res => {
            setBlogs(res.data.blogs);
            setLoading(false);
            console.log(res.data.blogs) ;
        })
    },[])
    return {
        loading , blogs
    } ;
}