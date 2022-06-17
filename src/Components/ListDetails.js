import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ListDetails() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("https://images-api.nasa.gov/search?media_type=image")
      .then((response) => {
        setData(response.data);
      })
      .then(
        (response) => {},
        (err) => {
          console.log(err);
        }
      );
  }, []);
  console.log("params", id);
  const refreshPage = () => {
    window.location.reload();
  };
  const DisplayData = data?.collection?.items?.map((items) => {
    return (
      <>
        {items.data
          ?.filter((lists) => lists?.nasa_id === id)
          .map((item) => {
            return (
              <div className="flex justify-around space-x-10">
                <div className="h-screen w-screen border">
                  {items?.links?.map((images) => (
                    <div>
                      <img src={images.href} />
                    </div>
                  ))}
                </div>
                <div className="h-screen w-screen border p-10 flex flex-col space-y-4">
                  <p className="text-blue-600">Title</p>
                  <p>{item?.title}</p>
                  <p className="text-blue-600">Description</p>
                  <p>{item?.description}</p>
                  <p className="text-blue-600">Photographer / Creater</p>
                  <p>{item?.secondary_creator}</p>
                  <p className="text-blue-600">Date Created</p>
                  <p>{item?.date_created ? item?.date_created : "N/A"}</p>
                  <p className="text-blue-600">Location</p>
                  <p>{item?.location ? item?.location : "N/A"}</p>
                  <p className="text-blue-600">Keywords</p>
                  <p>{item?.location ? item?.location : "N/A"}</p>
                </div>
              </div>
            );
          })}
      </>
    );
  });

  return (
    <div className=" grid grid-cols-1 place-content-center gap-16 p-10">
      <form class="flex items-center">
        <a onClick={refreshPage}>
          <Link
            to="/"
            class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Back
          </Link>
        </a>
      </form>
      <div>{DisplayData}</div>
    </div>
  );
}

export default ListDetails;
