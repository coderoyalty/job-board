import JobFilterForm from "../components/job/JobFilterForm";
import JobCard from "../components/job/JobCard";

const JobPage = () => {
  return (
    <>
      <>
        <section className="bg-inherit mt-4 relative flex gap-3 justify-center max-md:flex-col max-md:items-center w-full">
          {/* side-menu with filter forms */}
          <JobFilterForm />
          <div className="flex flex-col gap-3">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </section>
      </>
    </>
  );
};

export default JobPage;
