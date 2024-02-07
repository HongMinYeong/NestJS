import { AuthGuard } from '@nestjs/passport';

export class LoggedInGuard extends AuthGuard('local') {}
