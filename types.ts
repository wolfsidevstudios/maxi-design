export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  isThinking?: boolean;
}

export interface ThemeSettings {
  fontBody: string;
  fontHeading: string;
  radius: number;
  mode: 'light' | 'dark';
  primaryColor: string;
}

export type ModelType = 'gemini-3-pro-preview' | 'gemini-2.5-flash' | 'gemini-2.5-pro-preview-09-2025';

export interface AppSettings {
  activeModel: ModelType;
  raceModel: ModelType;
}

export interface ProjectData {
  id: string;
  name: string;
  lastEdited: number;
  messages: Message[];
  htmlCode: string;
  theme: ThemeSettings;
  thumbnail?: string;
  settings?: AppSettings;
}

export type ViewMode = 'landing' | 'editor';

export interface GeneratedCodeState {
  code: string;
  isLoading: boolean;
  version: number;
}