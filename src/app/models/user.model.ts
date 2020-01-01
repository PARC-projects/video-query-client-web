export interface IToken {
  token: string;
  is_staff: boolean;
  profile_id: number;
  bypass_onboarding: boolean;
}

export class Profile {
  profile_id: number;
  bypass_onboarding: boolean;
}
