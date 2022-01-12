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

export interface Data {
  element: any;
  elementPosition: DOMRect;
}

export interface HostComponent {
  data: Data;
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
  feedback?: Feedback
}

export interface pwdConfiguration {
  enableFeedback: boolean;
}
