export type RoleTeam = 'AUTHOR' | 'MEMBER';

export type AddMemberTeam = {
  user_id: number;
  team_id: number;
  role: RoleTeam;
  description: string;
};
