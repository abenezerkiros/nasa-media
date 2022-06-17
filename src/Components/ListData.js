import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListData = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
  const refreshPage = () => {
    window.location.reload();
  };
  console.log(data);
  const DisplayData = data?.collection?.items?.map((items) => {
    return (
      <>
        {items?.data
          ?.filter((row) => row?.title?.match(new RegExp(searchValue, "i")))
          .map((item) => {
            return (
              <tr class="">
                <td>
                  {items?.links?.map((images) => (
                    <div>
                      <img src={images.href} />
                    </div>
                  ))}
                </td>
                <td>{item?.title ? item?.title : "N/A"}</td>
                <td>
                  <div class="">{item?.location ? item?.location : "N/A"}</div>
                </td>
                <td>
                  {item?.secondary_creator ? item?.secondary_creator : "N/A"}
                </td>
                <td>
                  <a
                    href="#"
                    onClick={refreshPage}
                    class="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                  >
                    <Link to={`/details/${item?.nasa_id}`}>View Details </Link>
                  </a>
                </td>
              </tr>
            );
          })}
      </>
    );
  });

  return (
    <div className=" grid grid-cols-1 place-content-center gap-16 p-10">
      <form class="flex items-center">
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="relative w-full">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 outline-none block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Title..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
        </div>
        <button class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </form>
      <table class="tables overflow-y p-36">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Location</th>
            <th>Photographer</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>{DisplayData}</tbody>
      </table>
    </div>
  );
};

export default ListData;
