import { WithId } from "mongodb";

import db from "@/app/libs/db"
import { User } from "./User";

export { User };

export type UserWithId = WithId<User>;

export const MeetingData = db.collection<User>("users");