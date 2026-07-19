export const LOCAL_SESSION_KEY = "aura-local-session";

export interface LocalSession {
  email: string;
  displayName: string;
  settings?: Record<string, unknown>;
}

export function getLocalSession(): LocalSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(LOCAL_SESSION_KEY);
    return raw ? (JSON.parse(raw) as LocalSession) : null;
  } catch {
    return null;
  }
}

export function saveLocalSession(session: LocalSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
}

export function clearLocalSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LOCAL_SESSION_KEY);
}

export function saveLocalSettings(settings: Record<string, unknown>) {
  const session = getLocalSession();
  if (!session) return;

  const nextSession = { ...session, settings };
  saveLocalSession(nextSession);
}

export function getLocalSettings() {
  return getLocalSession()?.settings ?? null;
}
