import { ParkCommunityType, ParkInfrastructure, ParkUtilitiesIncluded } from "@prisma/client";
import { CreateParkDto } from "../dtos/create-park.dto";
import { NumberStringNull } from "../types/num-str-null.type";

export function mapRowToCreateParkDto(row: NumberStringNull[], mapping: string[]): CreateParkDto {
  const parkToCreate: Partial<CreateParkDto> = {};

  mapping.forEach((key, index) => {
    const rawValue: NumberStringNull = row[index] ?? null;

    switch (key) {
      case "name":
      case "address":
        parkToCreate[key] = (rawValue as string).trim();
        break;
      case "lotRent":
      case "spaceRent":
      case "effectiveLotRent":
      case "averageLotRent":
      case "averageAreaRent":
      case "medianHomePrice":
      case "spaceCount":
      case "mortgage":
      case "lat":
      case "lng":
        parkToCreate[key] = rawValue !== null ? +rawValue : null;
        break;

      case "communityType":
        parkToCreate[key] = rawValue !== null ? (rawValue as ParkCommunityType) : null;
        break;

      case "utilitiesIncluded":
        parkToCreate[key] = rawValue !== null ? (rawValue as ParkUtilitiesIncluded) : null;
        break;

      case "infrastructure":
        parkToCreate[key] = rawValue !== null ? (rawValue as ParkInfrastructure) : null;
        break;

      default:
        break;
    }
  });

  return parkToCreate as CreateParkDto;
}
