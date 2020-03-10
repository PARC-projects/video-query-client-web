export interface IToken {
  token: string;
  is_staff: boolean;
  profile_id: number;
  bypass_onboarding: boolean;
  first_name: string;
  last_name: string;
}

export class Profile {
  id: number;
  bypass_onboarding: boolean;
}
