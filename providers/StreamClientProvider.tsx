'use client'
import { useUser } from '@clerk/nextjs';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
import { tokenProvider } from '../acctions/stream.actions';
import { Loader } from 'lucide-react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//   const userId = 'user-id';
//   const token = 'authentication-token';
//   const user: User = { id: userId };
  
   
  
export const StreamVideoProvider = ({children}:{children:ReactNode}) => {
    const [VideoClient, setVideoClient] = useState<StreamVideoClient>()
   
    const{user,isLoaded}=useUser();



    useEffect(()=>{
   if(!isLoaded || !user) return;
   if(!apiKey) throw new Error('Stream API Key Missing')

    const client= new StreamVideoClient({
        apiKey,
        user:{
            id:user?.id,
            name:user?.username|| user?.id,
            image:user?.imageUrl,
        },
        tokenProvider,
    })

    setVideoClient(client);
    },[user,isLoaded]);


    if(!VideoClient) return <Loader></Loader>

    return (
      <StreamVideo client={VideoClient}>
            {children}
       </StreamVideo>
    );
  };

  export default StreamVideoProvider;