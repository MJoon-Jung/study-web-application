import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('api/user')
@Controller('users')
export class UsersController {
  constructor() {}
}
