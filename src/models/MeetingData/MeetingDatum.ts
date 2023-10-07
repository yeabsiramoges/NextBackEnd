import { z } from "zod";

const errors = {
    title: 'Title cannot be empty.',
    link: 'Link must be a valid URL.'
}

// Interface Schema
export const MeetingDatum = z.object({
    title: z.string().trim().min(1, errors.title),
    text: z.string().min(1),
    link: z.string().url(errors.link),
});

export const MeetingDatumProperties = MeetingDatum.keyof().Enum;
export type MeetingDatumProperty = keyof typeof MeetingDatumProperties

export type MeetingDatum = z.infer<typeof MeetingDatum>;