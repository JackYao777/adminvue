import service from "./request";

//获取验证码请求
export const GetCaptchaCodeApi = () => service.get(`https://localhost:7203/Admin/api/Captcha/GetCapcha`);

//换成post
// export const LoginApi = (username, captchcode, password) => service.get(`https://localhost:7203/Admin/api/SysUser/Login?UserName=${username}&Code=${captchcode}&Password=${password}`);
export const LoginApi = (data) => service.post(`https://localhost:7203/Admin/api/SysUser/Login`, data);
export const RemoveCaptchaApi = (captchaKey) => service.get(`https://localhost:7203/Admin/api/Captcha/RemoveCaptcha?request=${captchaKey}`);

export const GetUserInfosList = async (params) => service.get('https://localhost:7203/Admin/api/SysUser/GetList', { params: params });

export const AddUserInfosApi = async (data) => service.post('https://localhost:7203/Admin/api/SysUser/AddOrEdit', data);

export const GetRoleInfoApi = async (params) => service.get('https://localhost:7203/Admin/api/SysRole/GetList', { params: params });

export const AddRoleInfoApi = async (data) => service.post('https://localhost:7203/Admin/api/SysRole/AddOrEdit', data);

export const GetRoleInfoAllApi = async () => service.get('https://localhost:7203/Admin/api/SysRole/GetAll');

export const AddMenuInfoApi = async (data) => service.post('https://localhost:7203/Admin/api/SysMenu/AddOrEdit', data);

export const GetMenuInfoApi = async () => service.get('https://localhost:7203/Admin/api/SysMenu/GetList');

export const GetMenuInfoRawApi = async () => service.get('https://localhost:7203/Admin/api/SysMenu/GetRawList');

export const GetPowerInfoApi = async (params) => service.get('https://localhost:7203/Admin/api/SysRole/GetRolePower', { params: params });

export const AddRolePowerApi = async (data) => service.post('https://localhost:7203/Admin/api/SysRole/AddRolePower', data);

export const GetUserRoutersApi = async (params) => service.get('https://localhost:7203/Admin/api/SysMenu/GetRoutersByUserId', { params: params });


export const UploadFileApi=async(params,headers)=>service.post("https://localhost:7203/Admin/api/FileManager/UploadFile",params,headers)
export function getToken() {};
  

// export const GetUserRoutersApi = async () => {
//     return [
//         {
//             name: 'Customer',
//             path: 'customer',
//             meta: {
//                 title: '客户管理',
//                 icon: 'peoples'
//             },
//             children: [
//                 {
//                     name: 'customerOne',
//                     path: 'customerOne',
//                     meta: {
//                         title: '客户管理1',
//                         icon: 'peoples'
//                     },
//                 },
//                 {
//                     name: 'customerTwo',
//                     path: 'customerTwo',
//                     meta: {
//                         title: '发士大夫2',
//                         icon: 'peoples'
//                     },
//                 },
//                 {
//                     name: 'customerThree',
//                     path: 'customerThree',
//                     meta: {
//                         title: '发士大夫3',
//                         icon: 'peoples'
//                     },
//                 }
//             ]
//         }, {
//             name: 'Emergency',
//             path: 'emergency',
//             meta: {
//                 title: '应急管理fsdfadsfasdfasdf',
//                 icon: 'peoples'
//             }, children: []
//         }, {
//             name: 'FileManager',
//             path: 'fileManager',
//             meta: {
//                 title: '文件管理',
//                 icon: 'peoples'
//             }, children: []
//         }
//     ]
// }
export const GetUserInfoApi = (params) =>service.get('https://localhost:7203/Admin/api/SysUser/Get', { params: params });
//      {
//     return {
//         permissions: { btn1: true, btn2: true, btn3: true },
//         roles: { btn1: true, btn2: true, btn3: true },
//         user: { name: 'jack', set: '男', img: 'sdfsdf' }
//     }
// }

export const GetCustomerPageApi = async (parmas) => {
    return [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: 1,
    }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: 1,
    }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: 1,
    }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: null,
    }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: 0,
    }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: 0,
    }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: null,
    }];
}