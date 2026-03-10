import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../redux/slices/eventSlice";
import Header from "../../components/Header.jsx/Header";
import CategoriesCard from "../../components/Categories/CategoriesCard";
const Card = React.lazy(() => import("../../components/Card/Card"));

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedType, _setSelectedType] = useState("");
  const [_showFilters, _setShowFilters] = useState(false);

  const {
    data = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.events || {});

  useEffect(() => {
    if ((!data || data.length === 0) && !loading) {
      dispatch(getEvents());
    }
  }, [dispatch, data, loading]);

  const filteredData = useMemo(() => {
    if (!selectedType) return data;
    return data.filter((item) => item.category === selectedType);
  }, [data, selectedType]);

  const eventsToShow = filteredData;

  if (loading) return <p className="text-white p-10">Loading events...</p>;

  if (error) {
    const errMsg =
      typeof error === "string"
        ? error
        : error.message || JSON.stringify(error);
    return <p className="text-red-500 p-10">Error: {errMsg}</p>;
  }

  const uniqueTypes = [...new Set(data.map((event) => event.category))];

  console.log(selectedType);
  console.log(filteredData);

  return (
    <div className="min-h-screen bg-white text-black px-8">
      <Header />
      <h1 className="text-4xl font-bold mb-10 text-center">Upcoming Events</h1>
      <div className="mb-7 flex items-center ">
        {/* <p onClick={() => setShowFilters((prev) => !prev)}>Filters</p> */}
        <div className="flex w-full justify-around">
          <CategoriesCard uniqueTypes={uniqueTypes} />
        </div>

        {/* {uniqueTypes.map((filteritem) => {
          return (
            <>
              <button
                key={filteritem}
                className={` rounded-md px-2 py-1 transition text-sm
      ${selectedType === filteritem ? "bg-blue-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"}`}
                onClick={() => handleSelectFilter(filteritem)}
              >
                {filteritem}
              </button>
            </>
          );
        })} */}
        {/* <button onClick={() => setSelectedType("")}>Clear</button> */}
      </div>

      {Array.isArray(eventsToShow) && eventsToShow.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {eventsToShow.map((event, i) => (
            <Suspense key={event._id || i} fallback={<div>Loading...</div>}>
              <Card event={event} />
            </Suspense>
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}

      <div className="flex justify-center mt-16">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
