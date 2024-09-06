import service from "./request";

//获取数据
export const getDictionaryApi = async (request) => service.get('/basic/api/Dictionary/QueryType', { params: request });

//添加字典数据
export const AddDictionaryApi = async (request) => service.post('/basic/api/Dictionary/AddType',request);

//更新字典数据
export const UpdateDictionaryApi = async (request) => service.post('basic/api/Dictionary/UpdateType',request);

//获取字典详情数据
export const getDictionaryDetailApi = async (params) => service.get(`/basic/api/Dictionary/QueryData?dictionaryType=${params.dictionaryType}`);

//添加字典详情数据
export const AddDictionaryDetailApi = async (request) => service.post('/basic/api/Dictionary/AddData',request);
