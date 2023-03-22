import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

import Exceptions from "./exceptions/auth.exceptions";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    const bearer = authorizationHeader?.split(" ")[0];
    const token = authorizationHeader?.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      throw new Exceptions.UnauthorizedRequest({
        token: authorizationHeader,
      });
    }

    const parsedToken = this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });

    return (
      typeof parsedToken === "object" && parsedToken.id && parsedToken.login
    );
  }
}
