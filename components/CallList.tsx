"use client"
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import Loader from './Loader'
import { toast } from 'sonner'

const CallList = ({type}:{type:'ended'| 'upcoming' | 'recordings'}) => {

    const {endedCalls , upcomingCalls , callRecordings , isLoading} = useGetCalls();
    const [recordings , setRecordings] = useState<CallRecording[]>([]);

    const router = useRouter();

    const getCalls=()=>{
        switch(type){
            case 'ended':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recordings;
            default:
                return [];
        }
    }

    const getNoCallMessage=()=>{
        switch(type){
            case 'ended':
                return 'No Previous Calls ';
            case 'upcoming':
                return "No Upcoming Calls";
            case 'recordings':
                return "No Recordings";
            default:
                return '';
        }
    }

    useEffect(()=>{
        const fetchRecordings = async () => {

            try {
                const callData = await Promise.all(callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],);
    
                const recordings = callData
                .filter(call=> call.recordings.length>0)
                .flatMap(call=> call.recordings)
    
                setRecordings(recordings);
                
            } catch (error) {
                console.error("Error fetching recordings:", error);
                toast("Try again later")
            }
        }

        if(type === 'recordings'){
            fetchRecordings();
        }
    },[type , callRecordings]);

    const calls = getCalls()
    const noCallsMessage = getNoCallMessage();
    
    if(isLoading){
        return <Loader/>
    }

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2  rounded-xl shadow-lg shadow-slate-950 '>    
        {calls && calls.length > 0 ? 
            calls.map((meeting:Call|CallRecording , index)=>(
                <MeetingCard
                key={(meeting as Call).id || index} 
                icon={
                    type=== 'ended'
                    ? 'previous.svg'
                    : type === 'upcoming'
                    ? 'upcoming.svg'
                    : 'recordings.svg'
                }
                title={(meeting as Call).state?.custom?.description || (meeting as CallRecording)?.filename?.substring(0,20) || 'Personal Meeting'}
                date={(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording).start_time?.toLocaleString()}
                isPreviousMeeting={type === 'ended'}
                buttonIcon1={type==='recordings' ? 'play.svg' : undefined}
                buttonText={type==='recordings'? 'Play':'Start'}
                handleClick={type === 'recordings' ? ()=> router.push(`${(meeting as CallRecording).url}`) : ()=> router.push(`/meeting/${(meeting as Call).id}`) }
                link={type ==='recordings' ? (meeting as CallRecording).url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
                />
            )):(
                <h1>{noCallsMessage}</h1>
            )
        }
    </div>
  )
}

export default CallList
