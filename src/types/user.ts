export interface User {
  id: string;
  email: string;
  name: string;
  preferences: {
    defaultView: 'list' | 'board';
    theme: 'light' | 'dark' | 'system';
  };
}
