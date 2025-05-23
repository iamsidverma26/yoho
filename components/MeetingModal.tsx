import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';


interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({isOpen , onClose , title , className , children , handleClick , buttonText , image , buttonIcon}:MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-slate-900 px-6 py-9 text-white">
        <DialogTitle> </DialogTitle>
        <div className="flex flex-col gap-6 ">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button className="bg-blue-500 hover:bg-blue-600 focus-visible:ring-blue-500" onClick={handleClick}>
            {buttonIcon && (
                <Image src={buttonIcon} alt="icon" width={13} height={12} />)}
                &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingModal
