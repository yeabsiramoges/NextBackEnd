'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
    MeetingDatum, 
    MeetingDatumProperties, 
    MeetingDatumProperty 
} from "@/models/MeetingData/MeetingDatum";

interface MeetingDatumInput {
    
}

export default function MeetingDataForm() {

    // Input Validation w/ Zod
    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
    } = useForm<MeetingDatum>({
        resolver: zodResolver(MeetingDatum),
        defaultValues: {
            title: '',
            text: '',
            link: ''
        }
    });

    const onSubmit: SubmitHandler<MeetingDatum> = async (data) => {
        const response = await fetch('/api/meetings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json()
        console.log(json)
        //TODO: refresh list of meetings
        //TODO: handle submission errors
    };

    return (
        <form className="mx-auto max-w-md flex gap-2 flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input 
                    type="text" 
                    className={`input input-bordered w-full ${!!errors.title ? 'input-error' : ''}`}
                    {...register('title' as MeetingDatumProperty)}
                />
                {errors.title && <span>{errors.title.message}</span>}
            </div>
            
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Text</span>
                </label>
                <input 
                    type="text" 
                    className={`input input-bordered w-full ${!!errors.text ? 'input-error' : ''}`}
                    {...register('text' as MeetingDatumProperty)}
                />
                {errors.text && <span>{errors.text.message}</span>}
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Link</span>
                </label>
                <input 
                    type="text" 
                    step='any'
                    className={`input input-bordered w-full ${!!errors.link ? 'input-error' : ''}`}
                    {...register('link' as MeetingDatumProperty)}
                />
                {errors.link && <span>{errors.link.message}</span>}
            </div>
            <button className="btn btn-success">Create</button>
        </form>
    )
}