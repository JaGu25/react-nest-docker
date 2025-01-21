import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { AuthRoleGuard } from 'src/auth/guards/auth-role.guard';
import { Roles } from 'src/auth/interfaces/roles.interface';

export function Auth(...roles: Roles[]) {

    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), AuthRoleGuard),
    );

}