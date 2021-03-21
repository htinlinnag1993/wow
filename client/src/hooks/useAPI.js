// import {useEffect, useState} from "react";
// import {useAPIContext} from "../components/providers/Api";

// const getPropValue = (obj, key) =>
//   key.split(".").reduce((o, x) => (o === undefined ? o : o[x]), obj);

// const useAPI = (api, ...args) => {
//   const [resource, setResource] = useState([]);
//   const [fetching, setFetching] = useState(true);
//   const [error, setError] = useState(null);
//   const services = useAPIContext();

//   const method = getPropValue(services, api);
//   if (!method) {
//     throw new Error("API method not found ");
//   }

//   const getResponse = async () => {
//     setFetching(true);
//     try {
//       const res = await method(...args);
//       setResource(res.data);
//     } catch (e) {
//       setError(e);
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     getResponse();
//   }, []);

//   return {
//     fetch: getResponse,
//     resource,
//     fetching,
//     error,
//   };
// };

// export default useAPI;
