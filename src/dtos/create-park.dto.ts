import { ParkCommunityType, ParkInfrastructure, ParkUtilitiesIncluded } from "@prisma/client";

export class CreateParkDto {
  name!: string;
  address!: string;
  lotRent?: number | null;
  spaceRent?: number | null;
  communityType?: ParkCommunityType | null;
  utilitiesIncluded?: ParkUtilitiesIncluded | null;
  infrastructure?: ParkInfrastructure | null;
  effectiveLotRent?: number | null;
  averageLotRent?: number | null;
  averageAreaRent?: number | null;
  medianHomePrice?: number | null;
  spaceCount?: number | null;
  mortgage?: number | null;
  lat?: number | null;
  lng?: number | null;
}
