import Form from "@/app/ui/invoices/edit-form";
// import { EditInvoiceForm as Form } from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

//Changes project title to "Edit Invoice | Acme Dashboard" when user switches to the edit invoice page
export const metadata: Metadata = {
  title: "Edit Invoice",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id; // customer id

  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]); //promise.all allows us to run multiple promises at the same time in PARALLEL

  if (!invoice) {
    notFound(); //instead of our catch all error.tsx page displaying, we can use next's notFound() function to display a 404 page when we can't find an invoice
  }
  // if (!invoice || !customers) return null; //if we don't have an invoice or customers, return null (this is a loading state

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
