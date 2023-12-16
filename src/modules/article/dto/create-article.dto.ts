import { User } from '@/modules/user/entities/user.entity';
import { EnumStatus } from '@/types/user';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { CreateViewDto } from '@/modules/view/dto/create-view.dto';
import { CreateLikeDto } from '@/modules/like/dto/create-like.dto';
import { CreateCategoryDto } from '@/modules/category/dto/create-category.dto';
import { CreateCommentDto } from '@/modules/comment/dto/create-comment.dto';

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

  userId: string;

  categoryId: string;
}
