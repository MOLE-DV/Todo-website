export interface task {
  t_id: number;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  user_id: number;
  finished: boolean;
}
export interface popupStateI {
  hidden: boolean | null;
  title?: string;
  descritpion?: string;
  duration?: number;
  buttons?: {
    name: string;
    className?: string;
    onClick?: () => void;
  }[];
}
export interface userI {
  u_id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  accessToken: string;
}
