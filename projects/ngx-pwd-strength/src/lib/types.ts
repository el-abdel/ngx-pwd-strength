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
