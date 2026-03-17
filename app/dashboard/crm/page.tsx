import { listCrmCustomersAction } from "./actions";
import CrmClient from "./client";

export const dynamic = "force-dynamic";

export default async function CrmPage() {
  const { customers, role, teamId } = await listCrmCustomersAction();
  return (
    <CrmClient customers={customers} role={role} teamId={teamId} />
  );
}