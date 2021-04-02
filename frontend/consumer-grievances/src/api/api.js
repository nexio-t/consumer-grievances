import axios from "axios";

export default {
  getPopulationData: async () => {
    return await axios.get("https://aqueous-atoll-87775.herokuapp.com/https://consumer-grievances-backend.herokuapp.com/fetchPopulationData");
  },
  getRobocallData: async (searchedState) => {
    return axios.get(`https://aqueous-atoll-87775.herokuapp.com/https://consumer-grievances-backend.herokuapp.com/fetchRobocallComplaints/${searchedState}`);
  },
  getConsumerComplaintData: async (abbr) => {
    return axios.get(`https://aqueous-atoll-87775.herokuapp.com/https://consumer-grievances-backend.herokuapp.com/fetchConsumerComplaints/${abbr}`);
  },
};