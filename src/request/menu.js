import service from "./request";

//获取按钮权限数据数据
export const getButtonsPemission = async (adminId) => service.get(`/Admin/api/SysMenu/GetButtomPemisson?adminId=${adminId}`);



  