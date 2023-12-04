import { SetMetadata } from '@nestjs/common';
import { EnumRole } from 'src/types/user';

export const Role = (...roles: EnumRole[]) => SetMetadata('role', roles);
