"use client"
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from "sonner";
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'


const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState , setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>(undefined)
    const [values , setValues] = useState({
      dateTime:new Date(),
      description:'',
      link:''
    });

    const [callDetails , setCallDetails] = useState<Call>(); 

    const {user} = useUser()
    const client = useStreamVideoClient();
    const createMeeting = async () => {
      if(!client || !user) return;

      try{
        if(!values.dateTime) {
          toast("Please select a date and time");
          return;
        }
        const id = crypto.randomUUID();
        const call = client.call('default', id, )
        if(!call) throw new Error("Call not created");

        const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        
        const description = values.description || "No description";

        await call.getOrCreate({
          data:{
            starts_at:startsAt,
            custom:{description}
          }
        })

        setCallDetails(call);

        if(!values.description){
          router.push(`/meeting/${call.id}`);
        }

        toast("Meeting created successfully");


      }catch(error){
        console.error("Error creating meeting: ", error);
        toast("failed to create meeting");
      }
        
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="personal-room.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-400"
      />
      <HomeCard
        img="upcoming.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-blue-500"
      />
      <HomeCard
        img="recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-purple-500"
      />
      <HomeCard
        img="add-person.svg"
        title="Join Meeting"
        description="Via Invitation Link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-500"
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base leading-[22px] text-sky-300  ">
              Add a Description
            </label>
            <Textarea
              className="border-none bg-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-base leading-[22px] text-sky-300  ">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
              className="border-none bg-slate-950 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast("Meeting link copied to clipboard");
          }}
          image="/checked.svg"
          buttonIcon="copy.svg"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the Meeting Link here!"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={()=> router.push(values.link)}
      >
        <Input 
        placeholder='MeetingLink'
        className='border-none bg-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0'
        onChange={(e) => {
          setValues({ ...values, link: e.target.value });
        }}
        />
      </MeetingModal>
    </section>
  );
}

export default MeetingTypeList
