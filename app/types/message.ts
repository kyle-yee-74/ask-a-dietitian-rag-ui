export type Role = "user" | "bot";

export type Message = {
  id: number;
  role: Role;
  content: string;
};
