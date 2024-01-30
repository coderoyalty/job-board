import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { TbCurrencyNaira } from "react-icons/tb";
import {
  MdOutlineBusinessCenter,
  MdLocationCity,
  MdEdit,
} from "react-icons/md";
import { Tag } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "./preview.css";

function Preview() {
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchJob = async () => {
      const url = `/jobs/${id}`;
      try {
        const { data } = await axios.get(url);
        setData(data.data);
      } catch (err) {
        //
      }
    };

    fetchJob();
  }, [id]);

  return (
    <>
      <div className="joblisting-preview mx-auto w-[90%] bg-white mt-2 px-8 py-4 rounded shadow">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Job Title: {data?.title}</h1>
          <span className="flex items-center font-medium">
            Company <MdOutlineBusinessCenter className="ml-1" />: {data.company}
          </span>
          <span className="flex items-center font-medium">
            Location <MdLocationCity className="ml-1" />: {data.location}
          </span>
          <span className="flex items-center font-medium">
            Salary <TbCurrencyNaira className="ml-1" />: {data.salary}
          </span>
          <span className="font-medium flex gap-2">
            <Tag colorScheme="whatsapp">
              {new Date(data.createdAt).toDateString()}
            </Tag>
            {data.createdAt !== data.updatedAt && (
              <Tag
                className="flex items-center gap-[2px]"
                colorScheme="twitter"
              >
                <MdEdit />
                Edited
              </Tag>
            )}
          </span>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data?.description }}
          className=" "
        ></div>
      </div>
    </>
  );
}

export default Preview;
