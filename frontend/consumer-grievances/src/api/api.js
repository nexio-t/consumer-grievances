import axios from "axios";

export default {
  getPopulationData: async () => {
    return await axios.get("https://consumer-grievances-api.herokuapp.com/fetchPopulationData");
  },
  getRobocallData: async (searchedState) => {
    return axios.get(`https://consumer-grievances-api.herokuapp.com/fetchRobocallComplaints/${searchedState}`);
  },
  getConsumerComplaintData: async (abbr) => {
    return axios.get(`https://consumer-grievances-api.herokuapp.com/fetchConsumerComplaints/${abbr}`);
  },
};