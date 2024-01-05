import React from "react";
import JobFilterForm from "../components/job/JobFilterForm";
import JobCard from "../components/job/JobCard";
import { useEffect } from "react";
import { fetchData } from "../api";
import { Spinner, Button, ButtonGroup } from "@chakra-ui/react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = React.useState(page);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    const maxButtons = 5;

    let startPage = 1;
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (totalPages < maxButtons) {
      endPage = totalPages;
    } else if (currentPage > totalPages - maxButtons / 2) {
      startPage = totalPages - maxButtons;
      endPage = totalPages;
    } else {
      startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
      endPage = startPage + maxButtons - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
          fontWeight={i === currentPage ? "bold" : "normal"}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div>
      <div className="mb-4 text-2xl font-medium text-violet-600">
        <span>Page: {currentPage}</span>
      </div>
      <button>
        <ButtonGroup>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          {renderPaginationButtons()}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </ButtonGroup>
      </button>
    </div>
  );
};

const JobPage = () => {
  const [jobs, setJobs] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const limit = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const json = await fetchData(
        `/jobs?limit=${limit}&page=${page}&latest`,
        "GET"
      );
      console.log(json);

      const data = json.data;
      setJobs(data.data);
      setLoading(false);
      setTotalPages(data.pages);
    };

    fetchJobs();
  }, [page]);

  return (
    <>
      <>
        <section className="bg-inherit mt-4 relative flex gap-3 justify-center max-md:flex-col max-md:items-center w-full">
          {/* side-menu with filter forms */}
          <JobFilterForm />
          <div className="flex flex-col gap-3">
            {isLoading ? (
              <Spinner mt={4} color="blue.500" size={"xl"} />
            ) : (
              jobs.map((job) => <JobCard data={job} key={job._id} />)
            )}
          </div>
          <div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </section>
      </>
    </>
  );
};

export default JobPage;
