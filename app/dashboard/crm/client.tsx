"use client";

import * as React from "react";
import {
  Button,
} from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CRMCustomerSchema, createCrmCustomerAction, updateCrmCustomerAction, deleteCrmCustomerAction } from "./actions";
import { z } from "zod";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  customers: Customer[];
  role: string;
  teamId: string;
};

export default function CrmClient({ customers: initialCustomers, role, teamId }: Props) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function resetModal() {
    setEditing(null);
    setError(null);
    setSuccess(null);
  }

  const canEdit = ["admin", "owner"].includes(role);

  async function handleCreateOrEdit(data: z.infer<typeof CRMCustomerSchema>) {
    try {
      if (editing) {
        await updateCrmCustomerAction({ ...data, id: editing.id });
        setCustomers((c) =>
          c.map((cust) =>
            cust.id === editing.id ? { ...cust, ...data, updatedAt: new Date().toISOString() } : cust
          )
        );
        setSuccess("Customer updated");
      } else {
        await createCrmCustomerAction(data);
        setCustomers((c) => [
          ...c,
          {
            ...data,
            id: Math.random().toString(), // UI-only fake id for now (refresh resets); real id set on reload/server fetch
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
        setSuccess("Customer created");
      }
      setModalOpen(false);
      resetModal();
    } catch (err: any) {
      setError(err.message || "Failed to save");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this customer?")) return;
    try {
      await deleteCrmCustomerAction(id);
      setCustomers((c) => c.filter((cust) => cust.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete");
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        {canEdit && (
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setModalOpen(true); resetModal(); }}>Add Customer</Button>
            </DialogTrigger>
            <CustomerForm
              onSubmit={handleCreateOrEdit}
              initialData={null}
              onClose={() => setModalOpen(false)}
            />
          </Dialog>
        )}
      </div>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Company</Th>
            <Th>Notes</Th>
            <Th>Created</Th>
            {canEdit && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((c) => (
            <Tr key={c.id}>
              <Td>{c.name}</Td>
              <Td>{c.email}</Td>
              <Td>{c.phone}</Td>
              <Td>{c.company}</Td>
              <Td>{c.notes}</Td>
              <Td>{new Date(c.createdAt).toLocaleString()}</Td>
              {canEdit && (
                <Td>
                  <Dialog open={editing?.id === c.id} onOpenChange={(open) => {setEditing(open ? c : null); resetModal();}}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Edit</Button>
                    </DialogTrigger>
                    <CustomerForm
                      onSubmit={(data) => handleCreateOrEdit({ ...data, id: c.id })}
                      initialData={c}
                      onClose={() => setEditing(null)}
                    />
                  </Dialog>
                  <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(c.id)}>
                    Delete
                  </Button>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {customers.length === 0 && <div className="mt-6 text-center text-muted-foreground">No customers yet.</div>}
    </div>
  );
}

type CustomerFormProps = {
  onSubmit: (values: any) => Promise<void>;
  initialData: Partial<Customer> | null;
  onClose: () => void;
};

function CustomerForm({ onSubmit, initialData, onClose }: CustomerFormProps) {
  const form = useForm<z.infer<typeof CRMCustomerSchema>>({
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      company: initialData?.company || "",
      notes: initialData?.notes || "",
    },
    resolver: zodResolver(CRMCustomerSchema),
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{initialData ? "Edit Customer" : "Add Customer"}</DialogTitle>
        <DialogDescription>
          {initialData
            ? "Update customer details"
            : "Add a new customer to your CRM"}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            await onSubmit(values);
            onClose();
          })}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">{initialData ? "Update" : "Create"}</Button>
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}