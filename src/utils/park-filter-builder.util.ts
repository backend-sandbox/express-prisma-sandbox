import { Prisma } from "@prisma/client";
import { MeasureUnit } from "../enums/measure-unit.enum";
import { ParkCommunityType } from "@prisma/client";

export class ParkFilterBuilder {
  private conditions: Prisma.ParkWhereInput[] = [];

  filterByMultipleFields(searchString: string): ParkFilterBuilder {
    if (!searchString || searchString.trim() === "") {
      return this;
    }

    const searchTerms = searchString.trim().split(/\s+/).filter(Boolean);
    const orConditions: Prisma.ParkWhereInput[] = [];

    const zipRegex = /\b\d{5}(?:-\d{4})?\b/;
    const zipMatch = searchString.match(zipRegex);

    if (zipMatch) {
      orConditions.push({ address: { contains: zipMatch[0], mode: "insensitive" } });
    }

    for (const term of searchTerms) {
      if (term.trim() !== "") {
        orConditions.push({ address: { contains: term, mode: "insensitive" } });
        orConditions.push({ name: { contains: term, mode: "insensitive" } });
      }
    }

    if (orConditions.length > 0) {
      this.conditions.push({ OR: orConditions });
    }

    return this;
  }

  addressFilter(addressParams: string): ParkFilterBuilder {
    const zipRegex = /\b\d{5}(?:-\d{4})?\b/;
    const zipMatch = addressParams.match(zipRegex);

    const where: Prisma.ParkWhereInput = {};

    if (zipMatch) {
      where.OR = [{ address: { contains: zipMatch[0], mode: "insensitive" } }];
    } else {
      where.OR = [{ address: { contains: addressParams, mode: "insensitive" } }];
    }

    this.conditions.push(where);
    return this;
  }

  nameFilter(name: string): ParkFilterBuilder {
    this.conditions.push({ name: { contains: name, mode: "insensitive" } });

    return this;
  }

  communityTypeFilter(communityType?: ParkCommunityType): ParkFilterBuilder {
    if (communityType) {
      this.conditions.push({ communityType });
    }

    return this;
  }

  lotRentFilter(lotRentMin?: number, lotRentMax?: number): ParkFilterBuilder {
    const filter: Prisma.ParkWhereInput = {};

    if (lotRentMin !== undefined || lotRentMax !== undefined) {
      filter.lotRent = {};

      if (lotRentMin !== undefined) {
        filter.lotRent = { ...filter.lotRent, gte: lotRentMin };
      }

      if (lotRentMax !== undefined) {
        filter.lotRent = { ...filter.lotRent, lte: lotRentMax };
      }
    }

    if (Object.keys(filter).length > 0) {
      this.conditions.push(filter);
    }

    return this;
  }

  spaceCountFilter(spaceCountMin?: number, spaceCountMax?: number): ParkFilterBuilder {
    const filter: Prisma.ParkWhereInput = {};

    if (spaceCountMin || spaceCountMax) {
      filter.spaceCount = {};

      if (spaceCountMin) {
        filter.spaceCount = { ...filter.spaceCount, gte: spaceCountMin };
      }

      if (spaceCountMax) {
        filter.spaceCount = { ...filter.spaceCount, lte: spaceCountMax };
      }
    }

    if (Object.keys(filter).length > 0) {
      this.conditions.push(filter);
    }

    return this;
  }

  coordinatesFilter(
    lat: number,
    lng: number,
    radius: number,
    measureUnit: MeasureUnit,
  ): ParkFilterBuilder {
    if (!lat || !lng) {
      return this;
    }

    let meters: number;
    switch (measureUnit) {
      case MeasureUnit.Kilometers:
        meters = radius * 1_000;
        break;
      case MeasureUnit.Miles:
        meters = radius * 1_609;
        break;
      case MeasureUnit.Yards:
        meters = radius * 0.9144;
        break;
      default:
        meters = radius;
    }

    const filter: Prisma.ParkWhereInput = {
      AND: [
        { lat: { not: null }, lng: { not: null } },
        {
          lat: {
            gte: lat - meters / 111000,
            lte: lat + meters / 111000,
          },
          lng: {
            gte: lng - meters / (111000 * Math.cos((lat * Math.PI) / 180)),
            lte: lng + meters / (111000 * Math.cos((lat * Math.PI) / 180)),
          },
        },
      ],
    };

    this.conditions.push(filter);
    return this;
  }

  isSavedFilter(userId?: string, isSaved?: boolean): ParkFilterBuilder {
    if (userId && isSaved !== undefined) {
      this.conditions.push({
        views: {
          some: {
            userId,
            isSaved: isSaved,
          },
        },
      });
    }

    return this;
  }

  build(): Prisma.ParkWhereInput {
    return this.conditions.length > 0 ? { AND: this.conditions } : {};
  }
}
