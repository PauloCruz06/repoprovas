import { Users } from "@prisma/client";

export type userData = Omit<Users, 'id'>;