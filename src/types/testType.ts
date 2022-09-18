import { Tests } from "@prisma/client";

export type testData = Omit<Tests, 'id'>;