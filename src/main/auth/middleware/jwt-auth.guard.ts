import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    console.log("JwtAuthGuard-ctx",ctx)
    return  ctx.getContext().req
  }

   roles: string[]
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    this.roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('JwtAuthGuard=roles', this.roles)
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('JwtAuthGuard-user',user)
    const payload = user.user.user
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (!this.roles) {
      return true;
    }
    console.log('JwtAuthGuard-user.scope',payload.scope)
    if (this.roles.includes(payload.scope)) {
      return user
    }
    throw new ForbiddenException();
  }



}
