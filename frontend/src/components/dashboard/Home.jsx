/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { MdOutlineLocationOn } from "react-icons/md";
import { Tag } from "@chakra-ui/react";

function CandidateHomeComponent({ roleData }) {
  return (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="text-3xl font-medium">{roleData.fullName}</h1>
        <div className="flex gap-1 items-center font-semibold">
          <MdOutlineLocationOn /> {roleData.location}{" "}
        </div>
        <Tag colorScheme="twitter" size={"sm"} className="mt-1 ml-2">
          Applicant Account
        </Tag>
        <div className="mt-4 w-[300px]">
          <ul className="list list-disc">
            <h2 className="text-xl font-semibold">Skills</h2>
            {roleData.skills.map((skill, idx) => (
              <li key={idx} className="text-base max-md:text-sm font-semibold">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function EmployerHomeComponent() {
  return <></>;
}

function DashboardHome() {
  const { userData } = useAuth();

  const [user, setUser] = useState({});
  const [roleData, setRoleData] = useState({ skills: [] });

  useEffect(() => {
    if (userData) {
      setUser(userData.user);
      setRoleData(userData[userData.user.role]);
      console.log(userData);
    }
  }, [userData]);

  return (
    <>
      {user.role === "candidate" ? (
        <CandidateHomeComponent roleData={roleData} />
      ) : (
        <EmployerHomeComponent />
      )}
    </>
  );
}

export default DashboardHome;
