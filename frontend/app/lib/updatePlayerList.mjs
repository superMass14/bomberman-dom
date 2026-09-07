export const updatePL = (tab = [[]]) => {
  const datas = JSON.parse(localStorage.getItem("info"));
  datas.PlayerList = tab;
  localStorage.setItem("info", JSON.stringify(datas));
};
