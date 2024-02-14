import { FindManyOptions } from 'typeorm';
import { QueryBaseDto } from '@/global/QueryBaseDto';
import { EnumDatabaseTableName } from '@/types/core';

export class QueryUtil {
  public static findManyOptionsFilter(query: any): FindManyOptions {
    const opts: FindManyOptions = {};
    if (query?.withDeleted) opts.withDeleted = Boolean(query.withDeleted);
    if (query?.relations) opts.relations = query.relations;
    if (query?.take) opts.take = +query.take;
    if (query?.skip) opts.skip = +query.skip;
    if (query?.order) opts.order = query.order;
    return opts;
  }

  public static leftJoinAndSelects(qb: any, tableName: EnumDatabaseTableName, relations: string[]) {
    relations.forEach((relation) => {
      qb.leftJoinAndSelect(`${tableName}.${relation}`, relation);
    });
  }

  public static filterRelationsById(
    qb: any,
    tableName: EnumDatabaseTableName,
    relations: string[],
    query: QueryBaseDto
  ) {
    relations.forEach((relation) => {
      if (query.where[relation]) {
        qb.andWhere(`${tableName}.${relation}.id = :${relation}`, { [relation]: query.where[relation]?.id });
      }
    });
  }

  public static filterCommon(qb: any, filterCommon: string[], query: QueryBaseDto) {
    filterCommon.forEach((key) => {
      if (query.where[key]) {
        qb.andWhere(`${key} = :${key}`, { [key]: query.where[key] });
      }
    });
  }

  public static filterLike(qb: any, tableName: EnumDatabaseTableName, filterLike: string[], query: QueryBaseDto) {
    filterLike.forEach((key) => {
      if (query.where[key]) {
        qb.andWhere(`${tableName} ${query.like ? 'LIKE' : '='} :${key}`, { [key]: `%${query.where[key]}%` });
      }
    });
  }
}
