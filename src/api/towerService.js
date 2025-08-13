import api from "./api";
import { mapTowerDatas, mapTower } from "../utils/Utils.js";

export async function searchTowers(searchDto) {
  try {
    const res = await api.post("/towers/search", searchDto);
    return mapTowerDatas(res);
  } catch (err) {
    console.error("Error in searchTowers:", err);
    throw err; // để component cha xử lý
  }
}

export async function editTower(station) {
  try {
    const res = await api.put(`/towers/${station.id}`, station);
    return mapTower(res);
  } catch (err) {
    console.error("Error in editTower:", err);
    throw err;
  }
}

export async function deleteTower(station) {
  try {
    await api.delete(`/towers/${station.id}`);
  } catch (err) {
    console.error("Error in deleteTower:", err);
    throw err;
  }
}
