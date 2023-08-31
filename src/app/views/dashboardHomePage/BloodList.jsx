import Loader from "../../components/Loader";
import moment from "moment";
const BloodList = (
  { isFetching, isError, isSuccess, data }
) => {
  return (
    <>
      {isFetching && <Loader />}
      {isSuccess && (
        data?.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td >
              <span className="badge text-white bg-danger my-1" >
                {item?.blood_group}
              </span>

            </td>
            <td>{item?.user_name}</td>
            <td>{item?.number}</td>
            <td>{item?.units} Bags</td>
            <td>{item?.hospital_name}</td>
            <td>{moment(item?.needed_within_date).format("MMMM Do YYYY")}
            </td>
          </tr>
        ))
      )}
    </>
  );
};

export default BloodList