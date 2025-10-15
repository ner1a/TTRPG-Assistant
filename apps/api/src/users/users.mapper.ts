import { User } from '../users/userSchema';
import type { User as PublicUser } from '@repo/types';

export function toPublicUser(user: User): PublicUser {
    const anyUser = user as any;
    return {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      fullname: anyUser.fullname,
      avatar: anyUser.avatar,
      games: (anyUser.games ?? []).map((id: any) => id.toString()),
      characters: (anyUser.characters ?? []).map((id: any) => id.toString()),
      membership: user.membership,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    };
  }