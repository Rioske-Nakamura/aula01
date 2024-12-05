"use client"

import { useEffect } from "react";
import { useRouter } from "@/node_modules/next/navigation";
import { parseCookies, destroyCookie } from "@/node_modules/nookies";

const Reservar = () => {
    const router= useRouter()
    
  useEffect(() => {
    const {'restaurant-token': token} = parseCookies();
    if (!token){
      router.push("/login")
    }
  }, []);

    return(
        <h1>aaaaaaa teste</h1>
    )
};

export default Reservar;