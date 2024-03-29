import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { WorkspacesService } from './workspaces.service';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}
  @Get()
  async getMyWorkspaces(@User() user: Users) {
    return await this.workspacesService.findMyWorkspaces(user.id);
  }

  @Post()
  async createWorkspace(
    @User() user: Users,
    @Body() body: CreateWorkspaceDto,
  ) {
    this.workspacesService.
  }

  @Get(':url/members')
  geteAllMembersFromWorkspace() {}

  @Post(':url/members')
  inviteMembersToWorkspace() {}
  @Delete(':url/members/:id')
  kickMemberFromWorkspace() {}
  @Get(':url/members/:id')
  getMemberInfoInWorkspace() {}
  @Get(':url/users/:id')
  DEPRECATED_getMemberInfoInWorkspace() {
    this.getMemberInfoInWorkspace();
  }
}
