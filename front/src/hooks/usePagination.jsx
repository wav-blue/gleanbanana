import useApi from "./useApi";

//어떤 값을 받아서
export const getPostsPage = async (pageParam = 1, options = {}) => {
};

const usePagination = () => {
  const { trigger } = useApi({
    method: "get",
    path: "",
    data: {},
    shouldInitFetch: false,
  });
  const response = await trigger({});
  return response.data;
  return <div></div>;
};

export default usePagination;
