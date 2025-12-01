
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

export type ModelType = 'gemini-3-pro-preview' | 'gemini-2.5-flash' | 'gemini-flash-lite-latest';

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
}

export type ViewMode = 'landing' | 'editor' | 'privacy' | 'terms';

export interface GeneratedCodeState {
  code: string;
  isLoading: boolean;
  version: number;
}
