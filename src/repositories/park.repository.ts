import { Prisma, Park } from "@prisma/client";
import { prisma } from "../../prisma/client";
import { ParkQueryDto } from "../dtos/park-query.dto";
import { ParkFilterBuilder } from "../utils/park-filter-builder.util";
import { PageRequest } from "../utils/page-request.util";
import { ParkWithRelations } from "../types/park-with-relation.type";

export class ParkRepository {
  private readonly parkRepository = prisma.park;

  async findParks(
    query: ParkQueryDto,
    pageRequest: PageRequest,
    userId?: string,
  ): Promise<ParkWithRelations[] | null> {
    const where = this.parkSearchFilter(query, userId);

    const options: Prisma.ParkFindManyArgs = {
      where,
      ...pageRequest.getFilter(),
      include: {
        ...(userId && {
          views: {
            where: { userId },
            take: 1,
          },
        }),
      },
    };

    const parks = await this.parkRepository.findMany(options);

    return parks;
  }

  async findParkById(parkId: string): Promise<Park | null> {
    return await this.parkRepository.findUnique({
      where: {
        id: parkId,
      },
    });
  }

  async findParkByIdWithRelations(
    parkId: string,
    userId?: string,
  ): Promise<ParkWithRelations | null> {
    return await prisma.park.findUnique({
      where: { id: parkId },
      include: {
        ...(userId && {
          views: {
            where: { userId },
            take: 1,
          },
        }),
        notes: {
          take: 1,
        },
      },
    });
  }

  async getCountParksByFilter(query: ParkQueryDto, userId?: string): Promise<number> {
    const where = this.parkSearchFilter(query, userId);
    return await this.parkRepository.count({ where });
  }

  async countTotalParks(): Promise<number> {
    return await this.parkRepository.count();
  }

  private parkSearchFilter(query: Partial<ParkQueryDto>, userId?: string) {
    return new ParkFilterBuilder()
      .filterByMultipleFields(query.search_string || "")
      .addressFilter(query.q || "")
      .nameFilter(query.name || "")
      .communityTypeFilter(query.communityType)
      .lotRentFilter(query.lotRentMin, query.lotRentMax)
      .spaceCountFilter(query.spaceCountMin, query.spaceCountMax)
      .coordinatesFilter(query.lat!, query.lng!, query.radius!, query.measureUnit!)
      .isSavedFilter(userId, query.isSaved)
      .build();
  }
}
