import type { NextApiRequest, NextApiResponse } from "next";

import { WithId } from "mongodb";

import { MeetingData, MeetingDatum, MeetingDatumWithId } from "@/models/MeetingData/MeetingData";

type Data = {
    name: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MeetingDatumWithId | MeetingDatumWithId[] | { meeting: string }>,
) {
    try {
        switch (req.method) {
            case "POST":
                const validatedMeeting = await MeetingDatum.parseAsync(req.body)
                const insertResult = await MeetingData.insertOne(validatedMeeting);
                return res.status(200).json({
                    ...validatedMeeting,
                    _id: insertResult.insertedId,
                });
            case "GET":
                const meetings = await MeetingData.find().toArray();
                return res.status(200).json(meetings);
            default:
                return res.status(405);
        }
    } catch (e) {
        const error = e as Error;
        return res.status(500)
    }
}