import { EnumStatus } from '@/types/user';
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Tag } from '@/modules/tag/entities/tag.entity';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { Category } from '@/modules/category/entities/category.entity';
import { Like } from '@/modules/like/entities/like.entity';
import { View } from '@/modules/view/entities/view.entity';
import { User } from '@/modules/user/entities/user.entity';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  cover: string;

  @IsString()
  description: string;

  @IsNumberString()
  status: EnumStatus;

  @IsNumber()
  words: number;

  @IsOptional()
  isOriginal: boolean;

  @IsOptional()
  isComment: boolean;

  userId: User;

  category: Category;

  views: View[];

  likes: Like[];

  comments: Comment[];

  tags: Tag[];
}
