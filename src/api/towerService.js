import axios from "axios";
import { mapTowerDatas } from "../utils/Utils.js";

export async function searchTowers(searchDto) {
  try {
    const res = await axios.post("http://localhost:8080/api/towers/search", searchDto, {
      headers: { "Content-Type": "application/json" },
    });
    return mapTowerDatas(res.data);
  } catch (err) {
    console.error("Error in searchTowers:", err);
    throw err; // để component cha xử lý
  }
}
