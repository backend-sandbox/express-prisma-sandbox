import { Park, ParkNote, ParkView } from "@prisma/client";

export type ParkWithRelations = Park & {
  views?: ParkView[];
  notes?: ParkNote[];
};
