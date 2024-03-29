/* eslint-disable react/prop-types */
import { Badge, Stack, StackItem } from "@chakra-ui/react";
import TimeAgo from "timeago-react";
import { Link } from "react-router-dom";

const JobCard = ({ data }) => {
  return (
    <>
      <div className="transition-all delay-75 mx-2 w-[324px] sm:w-[424px] md:max-w-[482px] bg-[#E2C799] shadow-md rounded overflow-hidden hover:backdrop:blur-lg hover:bg-[rgba(255,255,255,0.45)]">
        <Link to={`/job/${data.id}`}>
          <Stack direction={"column"} spacing={1} className="p-2 md:p-4">
            <div className="flex justify-between">
              <div className="font-bold">{data.title}</div>
              <div>
                <Badge colorScheme="whatsapp">
                  <span className="text-base">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </span>
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cash"
                viewBox="0 0 16 16"
              >
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"></path>
              </svg>
              <b>Salary</b> {data.salary} NGN Monthly
            </div>
            {/* Location */}
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"></path>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
              </svg>
              {data.location}
            </div>
            {/* Company */}
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-building"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                ></path>
                <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"></path>
              </svg>
              {data.company}
            </div>
            {/* Info */}
            <Stack direction={"row"}>
              <StackItem>
                <Badge colorScheme="whatsapp">
                  {/* TODO: work_mode goes here e.g Remote, Onsite, Hybrid */}
                  <span className="text-sm"></span>
                </Badge>
              </StackItem>
              <StackItem>
                <Badge className="telegram">
                  <span className="text-sm">{data.applicants} applicants</span>
                </Badge>
              </StackItem>
              <StackItem>
                <Badge className="twitter animate-bounce">
                  <span className="text-sm">
                    <TimeAgo datetime={data.deadline} />
                  </span>
                </Badge>
              </StackItem>
            </Stack>
          </Stack>
        </Link>
      </div>
    </>
  );
};

export default JobCard;
