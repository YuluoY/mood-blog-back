import { UserModule } from '@/modules/user/user.module';
import { ArticleModule } from '@/modules/article/article.module';
import { CategoryModule } from '@/modules/category/category.module';
import { CommentModule } from '@/modules/comment/comment.module';
import { FileModule } from '@/modules/file/file.module';
import { FriendModule } from '@/modules/friend/friend.module';
import { LikeModule } from '@/modules/like/like.module';
import { ShareModule } from '@/modules/share/share.module';
import { ViewModule } from '@/modules/view/view.module';

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
