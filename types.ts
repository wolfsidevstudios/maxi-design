
export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  isThinking?: boolean;
  attachments?: {
    type: 'image';
    content: string; // Base64 string
    mimeType: string;
  }[];
}

export interface ThemeSettings {
  fontBody: string;
  fontHeading: string;
  radius: number;
  mode: 'light' | 'dark';
  primaryColor: string;
}

export type ModelType = 'gemini-3-pro-preview' | 'gemini-2.5-pro' | 'gemini-2.5-flash' | 'gemini-2.5-flash-lite';

export interface AppSettings {
  activeModel: ModelType;
  raceModel: ModelType;
  customApiKey?: string;
  enableThinking: boolean;
  enableStreaming: boolean;
}

export interface Screen {
  id: string;
  name: string;
  html: string;
}

export interface ProjectData {
  id: string;
  name: string;
  lastEdited: number;
  messages: Message[];
  screens: Screen[];
  activeScreenId: string;
  theme: ThemeSettings;
  thumbnail?: string;
  settings?: AppSettings;
  type?: 'mobile' | 'web' | 'presentation';
}

export type ViewMode = 'landing' | 'editor' | 'privacy' | 'terms' | 'login';

export interface GeneratedCodeState {
  code: string;
  isLoading: boolean;
  version: number;
}

export interface User {
  name: string;
  email: string;
  picture: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnailGradient: string;
  code: string;
  theme: ThemeSettings;
  type: 'mobile' | 'web' | 'presentation';
}
