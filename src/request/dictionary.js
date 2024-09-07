import service from "./request";

//获取数据
export const getDictionaryApi = async (request) => service.get('/basic/api/Dictionary/QueryType', { params: request });

//添加字典数据
export const addDictionaryApi = async (request) => service.post('/basic/api/Dictionary/AddType',request);

//更新字典数据
export const updateDictionaryApi = async (request) => service.post('basic/api/Dictionary/UpdateType',request);

//获取字典详情数据
export const getDictionaryDetailApi = async (params) => service.get(`/basic/api/Dictionary/QueryData?dictionaryType=${params.dictionaryType}`);

//添加字典详情数据
export const addDictionaryDetailApi = async (request) => service.post('/basic/api/Dictionary/AddData',request);

//删除字典数据
export const removeDicData= async (dicTypeCode) => service.get(`/basic/api/Dictionary/Delete?dicTypeCode=${dicTypeCode}`);
