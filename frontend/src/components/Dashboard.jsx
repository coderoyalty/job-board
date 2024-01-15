import React from "react";
import { Skeleton } from "@chakra-ui/react";
import DashboardLayout from "./dashboard/DashboardLayout";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout>
        <p className="text-cyan-700 text-3xl mb-6 font-bold">Dashboard</p>

        <div className="grid lg:grid-cols-3 gap-3 mb-8">
          <div className="h-[250px] bg-cyan-500 rounded-md" />
          <div className="h-[250px] bg-cyan-500 rounded-md" />
        </div>
        <div className="h-[450px] bg-fuchsia-500 rounded-[1rem]" />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
