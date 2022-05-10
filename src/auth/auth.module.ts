import { Logger, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { FirebaseAuthStrategy } from "./strategies/firebase-auth.strategy";

@Module({
  imports: [],
  providers: [Logger, FirebaseAuthStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
