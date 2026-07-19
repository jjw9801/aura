'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getLocalSession, saveLocalSession } from "@/lib/auth";
import { Language, t as translate, translations } from "@/lib/i18n";

interface UserSettings {
  display_name: string;
  dark_mode: boolean;
  language: Language;
  notifications_email: boolean;
  notifications_weekly: boolean;
  notifications_updates: boolean;
}

const defaultSettings: UserSettings = {
  display_name: "",
  dark_mode: true,
  language: "en",
  notifications_email: true,
  notifications_weekly: false,
  notifications_updates: true,
};

interface SettingsContextType {
  settings: UserSettings;
  email: string;
  loading: boolean;
  updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
  saveSettings: () => Promise<boolean>;
  t: (key: keyof typeof translations.en) => string;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Apply dark/light mode to document
  const applyTheme = useCallback((darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);

  // Load settings
  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const localSession = getLocalSession();

      if (session) {
        setEmail(session.user.email || "");
        const stored = session.user.user_metadata?.app_settings;
        const loaded = stored
          ? { ...defaultSettings, ...stored }
          : {
              ...defaultSettings,
              display_name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "",
            };
        setSettings(loaded);
        saveLocalSession({
          email: session.user.email || "",
          displayName: loaded.display_name,
          settings: loaded as unknown as Record<string, unknown>,
        });
        applyTheme(loaded.dark_mode);
      } else if (localSession) {
        setEmail(localSession.email || "");
        const loaded = {
          ...defaultSettings,
          ...(localSession.settings as Partial<UserSettings> | undefined),
          display_name: localSession.displayName || defaultSettings.display_name,
        } as UserSettings;
        setSettings(loaded);
        applyTheme(loaded.dark_mode);
      }
      setLoading(false);
    };
    load();
  }, [applyTheme]);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      // Apply theme immediately when dark mode changes
      if (key === "dark_mode") {
        applyTheme(value as boolean);
      }
      return next;
    });
  };

  const saveSettings = async (): Promise<boolean> => {
    const { error } = await supabase.auth.updateUser({
      data: { app_settings: settings },
    });

    if (!error) {
      saveLocalSession({
        email,
        displayName: settings.display_name,
        settings: settings as unknown as Record<string, unknown>,
      });
    }

    return !error;
  };

  const t = (key: keyof typeof translations.en) => translate(settings.language, key);

  return (
    <SettingsContext.Provider value={{ settings, email, loading, updateSetting, saveSettings, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}