"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";
import { crmCustomers } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getAuthSession } from "@/lib/auth/session";

const CRMCustomerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  notes: z.string().optional(),
});

export async function listCrmCustomersAction() {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  // Assume user has only 1 active team for simplicity; expand as needed.
  // Fetch teamId from teamMembers, then fetch customers for team.
  const teams = await db.query.teamMembers.findMany({
    where: eq("user_id", session.userId),
    columns: ["teamId", "role"],
  });
  if (!teams?.length) throw new Error("No team found");
  const [team] = teams;
  const customers = await db
    .select()
    .from(crmCustomers)
    .where(eq(crmCustomers.teamId, team.teamId))
    .orderBy(crmCustomers.createdAt);
  return {
    customers,
    role: team.role,
    teamId: team.teamId,
  };
}

export async function createCrmCustomerAction(payload: unknown) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const data = CRMCustomerSchema.omit({ id: true }).parse(payload);

  // Check team and permissions
  const teams = await db.query.teamMembers.findMany({
    where: eq("user_id", session.userId),
    columns: ["teamId", "role"],
  });
  if (!teams?.length) throw new Error("No team");
  const [team] = teams;
  if (!["admin", "owner"].includes(team.role)) {
    throw new Error("Not authorized");
  }

  await db.insert(crmCustomers).values({
    ...data,
    teamId: team.teamId,
  });

  return { success: true };
}

export async function updateCrmCustomerAction(payload: unknown) {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");
  const data = CRMCustomerSchema.parse(payload);
  if (!data.id) throw new Error("Missing customer id");

  // Check team/permissions
  const teams = await db.query.teamMembers.findMany({
    where: eq("user_id", session.userId),
    columns: ["teamId", "role"],
  });
  if (!teams?.length) throw new Error("No team");
  const [team] = teams;
  if (!["admin", "owner"].includes(team.role)) {
    throw new Error("Not authorized");
  }

  // Ensure customer belongs to this team
  const [existing] = await db
    .select()
    .from(crmCustomers)
    .where(and(eq(crmCustomers.id, data.id), eq(crmCustomers.teamId, team.teamId)));
  if (!existing) {
    throw new Error("Not found");
  }

  await db
    .update(crmCustomers)
    .set({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      notes: data.notes,
      updatedAt: new Date(),
    })
    .where(and(eq(crmCustomers.id, data.id), eq(crmCustomers.teamId, team.teamId)));

  return { success: true };
}

export async function deleteCrmCustomerAction(id: string) {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");
  if (!id) throw new Error("Missing customer id");

  // Check team/permissions
  const teams = await db.query.teamMembers.findMany({
    where: eq("user_id", session.userId),
    columns: ["teamId", "role"],
  });
  if (!teams?.length) throw new Error("No team");
  const [team] = teams;
  if (!["admin", "owner"].includes(team.role)) {
    throw new Error("Not authorized");
  }

  // Ensure customer belongs to this team
  const [existing] = await db
    .select()
    .from(crmCustomers)
    .where(and(eq(crmCustomers.id, id), eq(crmCustomers.teamId, team.teamId)));
  if (!existing) {
    throw new Error("Not found");
  }

  await db
    .delete(crmCustomers)
    .where(and(eq(crmCustomers.id, id), eq(crmCustomers.teamId, team.teamId)));

  return { success: true };
}