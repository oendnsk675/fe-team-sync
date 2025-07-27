export type RoleTeam = 'AUTHOR' | 'MAINTENER' | 'DEVELOPER';

export type AddMemberTeam = {
  user_id: number;
  team_id: number;
  role: RoleTeam;
  description: string;
};
