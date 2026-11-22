export function buildInviteLink(origin: string, code: string, inviteToken: string) {
    return `${origin.replace(/\/$/, '')}/r/${code}#t=${inviteToken}`;
}