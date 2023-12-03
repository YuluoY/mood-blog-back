import { SetMetadata } from '@nestjs/common';
import { YRoles } from 'src/types/core';

export const Role = (...roles: YRoles[]) => SetMetadata('role', roles);
