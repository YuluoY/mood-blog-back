import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { QueryCommentDto } from '@/modules/comment/dto/query-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Visitor } from '@/modules/visitor/entities/visitor.entity';
import { Article } from '@/modules/article/entities/article.entity';
import { QueryUtil } from '@/global/QueryFilter';
import { EnumDatabaseTableName } from '@/types/core';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentManager: Repository<Comment>
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      return await this.commentManager.manager.transaction(async (manager) => {
        const { user, article, parent, visitor, reply } = createCommentDto;
        const $Comment = manager.create(Comment);
        Object.assign($Comment, createCommentDto);
        if (user && user.id) {
          $Comment.user = await manager.findOne(User, { where: { id: user.id } });
        }
        if (visitor && visitor.id) {
          $Comment.visitor = await manager.findOne(Visitor, { where: { id: visitor.id } });
        }
        if (article && article.id) {
          $Comment.article = await manager.findOne(Article, { where: { id: article.id } });
        }
        if (parent && parent.id) {
          $Comment.parent = await manager.findOne(Comment, { where: { id: parent.id } });
        }
        if (reply && reply.id) {
          $Comment.reply = await manager.findOne(Comment, { where: { id: reply.id } });
        }
        return await manager.save($Comment);
      });
    } catch (e) {
      throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.commentManager.find({
      relations: ['user', 'article']
    });
  }

  async findOne(unique: Partial<QueryCommentDto>) {
    return await this.commentManager.findOne({
      where: unique,
      relations: ['user', 'article']
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      return await this.commentManager.manager.transaction(async (manager) => {});
    } catch (e) {
      throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string | string[]) {
    return await this.commentManager.softDelete(id);
  }

  async restore(id: string | string[]) {
    return await this.commentManager.restore(id);
  }

  async pagination(page: number, limit: number, query: QueryCommentDto<Comment>) {
    const qb = this.commentManager.createQueryBuilder('comment');
    query.relations.push(...['parent', 'children']);

    QueryUtil.leftJoinAndSelects(qb, EnumDatabaseTableName.Comment, query.relations);
    QueryUtil.filterRelationsById(qb, EnumDatabaseTableName.Comment, query.relations, query);

    qb.leftJoinAndSelect('children.parent', 'childrenParent');
    qb.leftJoinAndSelect('children.reply', 'childrenReply');
    qb.leftJoinAndSelect('children.visitor', 'childrenVisitor');

    const filterCommon = ['status', 'isTop', 'isSubscribe', 'qq'];
    QueryUtil.filterCommon(qb, filterCommon, query);

    const filterLike = ['content', 'nickname'];
    QueryUtil.filterLike(qb, EnumDatabaseTableName.Comment, filterLike, query);

    console.log('query.where?.article', query.where?.article);
    if (query.where?.article) {
      qb.andWhere('comment.article.id = :articleId', { articleId: query.where.article.id });
    }

    const total = await qb.getCount();

    const [list, rawTotal] = await qb
      .take(+limit)
      .skip((page - 1) * limit)
      .andWhere('comment.parent is null')
      .addOrderBy('comment.isTop', 'DESC')
      .addOrderBy(`comment.${query.sort || 'createdAt'}`, query.order || 'ASC')
      .getManyAndCount();

    // 处理children排序
    list.forEach((item) => {
      item.children = item.children.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      // 如果children 中有isTop为true，将该评论位置提前到children数组最前面
      const topIndex = item.children.findIndex((child) => child.isTop);
      if (topIndex !== -1) {
        const topItem = item.children.splice(topIndex, 1);
        item.children = topItem.concat(item.children);
      }
    });

    return {
      list,
      total,
      rawTotal,
      page: +page,
      limit: +limit
    };
  }
}
