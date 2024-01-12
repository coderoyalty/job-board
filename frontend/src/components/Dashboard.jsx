import React from "react";
import { Skeleton } from "@chakra-ui/react";
import DashboardLayout from "./dashboard/DashboardLayout";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout>
        <p className="text-cyan-700 text-3xl mb-6 font-bold">Dashboard</p>

        <div className="grid lg:grid-cols-3 gap-3 mb-8">
          <Skeleton height={160} zIndex={1}></Skeleton>
          <Skeleton height={160} zIndex={1}></Skeleton>
          <Skeleton height={160} zIndex={1}></Skeleton>
        </div>
        <Skeleton
          startColor="red.500"
          endColor="green.600"
          className="grid col-1"
          height={300}
          zIndex={1}
        ></Skeleton>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
