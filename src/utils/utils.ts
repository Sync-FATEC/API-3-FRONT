export const formatDateHour = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return localDate.toLocaleDateString("pt-BR");
};
