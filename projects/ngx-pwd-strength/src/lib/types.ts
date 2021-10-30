export interface DOMRect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface HostComponent {
  data: any; //todo: define data type
  show: boolean;
  close: boolean;
  events: any;
}

export interface Feedback {
  suggestions: string[];
  warning: string
}

export interface PwdScore {
  score: number;
  feedback: Feedback
}
