import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios, { all } from "axios";


const useFetchData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("http://127.0.0.1:8000/api/personnes"),
      axios.get("http://127.0.0.1:8000/api/projets"),
    ]).then(([personnesRes, projetsRes]) => {
        dispatch({ type: "UPDATE_PERSONNES", payload: personnesRes.data.data });
        dispatch({ type: "UPDATE_PROJETS", payload: projetsRes.data.data });

      }).catch((error) => {
        console.error("Error fetching data:", error);
      }).finally(() => {
        setLoading(false);
      });
  },[dispatch]);

  return loading;
};



export { useFetchData };
