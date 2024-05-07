import moment from "moment";

export const formatUnixTime = (time, offset) => {
  const timestampInMilliseconds = +time * 1000;
  const localTime = moment.utc(timestampInMilliseconds).add(offset, "seconds");
  const formattedTime = localTime.format("HH:mm");
  return formattedTime;
};

export const getLocalTime = (offset) => {
  const localTime = moment.utc().add(offset, "seconds");
  return localTime;
};
