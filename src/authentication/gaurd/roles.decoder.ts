import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const RolesExclude = (...roles: string[]) => SetMetadata('rolesExclude', roles);