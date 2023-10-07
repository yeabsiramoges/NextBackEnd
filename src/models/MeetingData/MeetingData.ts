import { WithId } from "mongodb";

import db from "@/app/libs/db"
import { MeetingDatum } from "./MeetingDatum";

export { MeetingDatum };

export type MeetingDatumWithId = WithId<MeetingDatum>;

export const MeetingData = db.collection<MeetingDatum>("meetings");