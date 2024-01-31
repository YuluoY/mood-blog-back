import { FindManyOptions } from 'typeorm';

export class QueryFilter {
  static findManyOptionsFilter(query: any): FindManyOptions {
    const opts: FindManyOptions = {};
    if (query?.withDeleted) opts.withDeleted = Boolean(query.withDeleted);
    if (query?.relations) opts.relations = query.relations;
    if (query?.take) opts.take = +query.take;
    if (query?.skip) opts.skip = +query.skip;
    if (query?.order) opts.order = query.order;
    return opts;
  }
}
