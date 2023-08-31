import { useUserListAdminQuery } from "../../../services/resourceApi";
import avatar from "../../../assets/images/avatar.png";
import moment from "moment";
const MemberDetails = ({ handleClose, paramValue }) => {
    const res = useUserListAdminQuery(paramValue)
    const { data, isSuccess, isFetching, isError } = res;

    return (
        <div>
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between">
                    <div>
                        <h6 className="m-0 font-weight-bold text-primary">
                            Member Information Details
                        </h6>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row ">
                        <div className="col-md-4 shadow p-4">
                            <div className="text-center">
                                <img
                                    className="img-fluid rounded-circle shadow-lg"
                                    style={{ width: "200px", height: "200px" }}
                                    src={
                                        data?.data?.image === null
                                            ? avatar
                                            :
                                            `${import.meta.env.VITE_ASSET_HOST_URL}${data?.data?.image}`
                                    }
                                    alt=""
                                />
                            </div>

                            <div className="pt-2">
                                <div className="p-2 mb-5 text-center">
                                    <div className="font-weight-bold text-dark d-inline  rounded">
                                        {data?.data?.name}
                                    </div>
                                </div>
                                <p>
                                    Email:
                                    <span className="font-weight-bold text-primary ">
                                        {data?.data?.email}
                                    </span>
                                </p>

                                <p>
                                    Number:
                                    <span className="font-weight-bold text-primary">
                                        {data?.data?.contact_no}
                                    </span>
                                </p>
                                <p>
                                    Batch:
                                    <span className="font-weight-bold text-primary">
                                        {data?.data?.batch_no}
                                    </span>
                                </p>
                                <p>
                                    Department:
                                    <span className="font-weight-bold text-primary ">
                                        {data?.data?.department
                                        }
                                    </span>
                                </p>
                                <p>
                                    Student Id :
                                    <span className="font-weight-bold text-primary">
                                        {data?.data?.student_id_no}
                                    </span>
                                </p>
                                <p>
                                    Bio:
                                    <span className="ms-1">
                                        {data?.data?.bio}
                                    </span>
                                </p>


                            </div>
                        </div>
                        <div className="col-md-8 p-5">
                            <div className="  d-flex justify-content-between">
                                <div>
                                    <h4 className="py-2">Personal Details.</h4>
                                </div>
                                <div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>
                                        Father Name:
                                        <span className="font-weight-bold text-primary ">
                                            {data?.data?.father_name}
                                        </span>
                                    </p>
                                    <p>
                                        Mother Name:
                                        <span className="font-weight-bold text-primary ">
                                            {data?.data?.mother_name}
                                        </span>
                                    </p>

                                    <p>
                                        Marital Status:
                                        <span className="font-weight-bold text-primary">
                                            {data?.data?.marital_status}
                                        </span>
                                    </p>
                                    <p>
                                        Blood Group:
                                        <span className="font-weight-bold text-primary">
                                            {data?.data?.blood_group}
                                        </span>
                                    </p>
                                    <p>
                                    Last Blood Donation Date:
                                        <span className="font-weight-bold text-primary">
                                            {moment(data?.data?.last_blood_donation_date).format("DD-MM-YYYY")}
                                        </span>
                                    </p>
                                    <p>
                                        Passport No.:
                                        <span className="font-weight-bold text-primary">
                                            {data?.data?.passport_no}
                                        </span>
                                    </p>

                                    <p>
                                        Facebook:
                                        <span className="font-weight-bold text-primary">
                                            {data?.data?.facebook}
                                        </span>
                                    </p>
                                    <p>
                                        Twitter:
                                        <span className="font-weight-bold text-primary">
                                            {data?.data?.twitter}
                                        </span>
                                    </p>

                                </div>
                                <div className="col-md-6">
                                    <p>
                                        Religion:
                                        <span className="font-weight-bold text-primary">
                                            {data?.data?.religion}
                                        </span>
                                    </p>

                                    <p>
                                        Gender:
                                        <span className="font-weight-bold text-primary ">
                                            {data?.data?.gender}
                                        </span>
                                    </p>
                                    <p>
                                        Date of Birth:
                                        <span className="font-weight-bold text-primary ">
                                            {data?.data?.date_of_birth
                                            }
                                        </span>
                                    </p>
                                    <p>
                                        Birth certificate No.:
                                        <span className="font-weight-bold text-primary ">
                                            {data?.data?.birth_certificate_no
                                            }
                                        </span>
                                    </p>
   <p>
                                        Interested to Donate.:
                                        <span className="font-weight-bold text-primary ">
                                            {data?.data?.interested_to_donate === true ?
                                                
                                                <span className=" badge bg-success">Yes</span>
                                                :
                                                <span className=" badge bg-secondary">No</span>
                                            }
                                        </span>
                                    </p>
                                    <p>
                                        NID No.:
                                        <span className="font-weight-bold text-primary ">
                                            {data?.data?.nid_no
                                            }
                                        </span>
                                    </p>
                                 
                                    <p>
                                        Linkedin:
                                        <span className="font-weight-bold text-primary">
                                            {data?.data?.linkedin}
                                        </span>
                                    </p>
                                    <p>
                                        Instagram:
                                        <span className="font-weight-bold text-primary">
                                            {data?.data?.instagram}
                                        </span>
                                    </p>
                                </div>
                            </div>


                            <h4 className="py-2 ">Address Details.</h4>
                            <div className="row ">
                                <div className="col-md-6">
                                    <p>
                                        Present Address:
                                        <span className="font-weight-bold text-primary ">
                                            {data?.data?.present_address}
                                        </span>
                                    </p>
                                    <p>
                                        Permanent Address :
                                        <span className="font-weight-bold text-primary ">
                                            {data?.data?.permanent_address}
                                        </span>
                                    </p>



                                    <p>
                                        Country:
                                        <span className="font-weight-bold text-primary">
                                            {data?.data?.country_name}
                                        </span>
                                    </p>

                                    <p>
                                        State:
                                        <span className="font-weight-bold text-primary ">
                                            {data?.data?.state_name}
                                        </span>
                                    </p>
                                    <p>
                                        City:
                                        <span className="font-weight-bold text-primary ">
                                            {data?.data?.city_name}
                                        </span>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MemberDetails;
