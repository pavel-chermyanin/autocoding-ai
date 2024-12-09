import axios from "axios";

const createAxiosOpenQuestionInstance = () => {
  const instance = axios.create({
    baseURL: "/api/open-question-proxy", // Прокси-роут
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": "ru",
    },
  });

  // console.log(1111)
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (error.response.status === 400) {
          return Promise.reject(new Error(error.response.data.detail));
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const openQuestionClient = createAxiosOpenQuestionInstance();
