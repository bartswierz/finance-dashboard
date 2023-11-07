"use server"; //this marks ALL EXPORTED FUNCTIONS as SERVER FUNCTIONS. These can then be imported into BOTH CLIENT & SERVER COMPONENTS MAKING THEM VERY VERSATILE

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // const rawFormData = {
  //   customerId: formData.get("customerId"),
  //   amount: formData.get("amount"),
  //   status: formData.get("status"),
  // };
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0]; //"YYYY-MM-DD”
  //ALTERNATIVE:
  //const rawFormData = Object.fromEntries(formData.entries())

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  // Test it out:
  // console.log(rawFormData);
  // console.log(typeof rawFormData.amount);
  revalidatePath("/dashboard/invoices"); //clears cache and then initaites a NEW SERVER REQUEST, this updates the data after it has been created and then can be displayed. Without this it would not show up right away
  redirect("/dashboard/invoices"); //REDIRECT USER TO THE INVOICE PAGE AFTER CREATING AN INVOICE IN OUR DATABASE
}
