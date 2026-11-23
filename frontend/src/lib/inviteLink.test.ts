import { describe, expect, it } from 'vitest';
import { buildInviteLink } from './inviteLink';

describe('buildInviteLink', () => {
  it('puts the code in the path and the token after #t=', () => {
    expect(
      buildInviteLink(
        'https://scrumpoker.app',
        'ab3-k9x',
        'Xq7fR2mLp9vA4kT8wZc1Ne',
      ),
    ).toBe('https://scrumpoker.app/r/ab3-k9x#t=Xq7fR2mLp9vA4kT8wZc1Ne');
  });

  it('ignores a trailing slash on the origin', () => {
    expect(buildInviteLink('https://scrumpoker.app/', 'ab3-k9x', 'tok')).toBe(
      'https://scrumpoker.app/r/ab3-k9x#t=tok',
    );
  });
});
