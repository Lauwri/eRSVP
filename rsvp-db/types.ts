export enum Language {
  'FIN' = 'FIN',
  'ENG' = 'ENG',
}

export enum TelegramState {
  'none' = 'none',
  'select_language' = 'select_language',
  'signup_question' = 'signup_question',
  'set_name' = 'set_name',
  'help' = 'help',
  'confirm_cancel_signup' = 'confirm_cancel_signup',
}

export enum DateType {
  'close_rsvp' = 'close_rsvp',
  'open_rsvp' = 'open_rsvp',
}

export interface Dates {
  type: DateType;
  date: Date;
}

export interface Telegram {
  id: number;
  telegramId: number;
  chatId: number;
  language: Language;
  name?: string;
  coming: boolean;
  avec?: boolean;
  arrived?: boolean;
  state: TelegramState;
}

export interface Blacklist {
  telegramId: number;
  until: Date;
  reason: string;
}

export interface Forms {
  id: number;
  email: string;
  name: string;
  coming: boolean;
  arrived?: boolean;
}

export interface Custom {
  id: number;
  name: string;
  coming: boolean;
  arrived?: boolean;
}

export interface MessagesIn {
  telegramId: number;
  messageId: number;
  created_at: Date;
}

export enum Source {
  'FORMS' = 'FORMS',
  'TG' = 'TG',
  'CUSTOM' = 'CUSTOM',
}
