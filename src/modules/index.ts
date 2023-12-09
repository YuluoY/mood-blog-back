import { UserModule } from '@/modules/user/user.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';
import { FriendModule } from './friend/friend.module';
import { LikeModule } from './like/like.module';
import { ShareModule } from './share/share.module';
import { ViewModule } from './view/view.module';

export default [
  UserModule,
  ArticleModule,
  CategoryModule,
  CommentModule,
  FileModule,
  FriendModule,
  LikeModule,
  ShareModule,
  ViewModule
];
