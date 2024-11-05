export interface API<T> {
  message: string;
  success: boolean;
  data?: T;
}
