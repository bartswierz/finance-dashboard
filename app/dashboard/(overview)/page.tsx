import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
// import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";
import { fetchCardData } from "@/app/lib/data";
import { Suspense } from "react";
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from "@/app/ui/skeletons";
import Cards from "@/app/ui/dashboard/cards";

export default async function Page() {
  // const revenue = await fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();
  const { totalPaidInvoices, numberOfCustomers, numberOfInvoices, totalPendingInvoices } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" /> */}
        {/* WE ARE COMBINING THE FOUR ELEMENTS TOGETHER TO PREVENT A AKWKWARD POPPING EFFECT TO THE USER(ex. element 1 display, then elmem 3 then 2, then 4, instead, we will show ALL at once to be cleaner to the user). USE THIS PATTERN IF YOU EVER WANT MULTIPLE COMPONENTS TO APPEAR AT ONCE INSTEAD OF ONE AFTER ANOTHER */}
        <Suspense fallback={<CardsSkeleton />}>
          <Cards />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* The suspense boundary will allow us to DISPLAY a REVENUE SKELETON WHILE IT COMPLETES THE 3 SECOND DELAY. This will allow our other data to display almost immediately while this portion is loading in. THIS IS SET TO a 3000ms delay for an example */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        {/* <RevenueChart revenue={revenue} /> */}
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
        {/* SET A 5000ms DELAY TO SHOW LOADING EXAMPLE */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
