export function validateUsername(rule, value, callback){
        console.log(value)
        if (value === '') {
      callback(new Error('请再次输入用户名'));
    } else if (value.length<2||value.length>5) {
      callback(new Error('用户名长度必须是2到5之间!'));
    } else {
      callback();
    }
  };


// var validateData={
//     validateUsername(rule, value, callback){
//                 console.log(value)
//                 if (value === '') {
//               callback(new Error('请再次输入用户名'));
//             } else if (value.length<3||value.length>20) {
//               callback(new Error('用户名长度必须是3到20之间!'));
//             } else {
//               callback();
//             }
//           },
//           demo(){},
//           Cardata:{
//             name:"jack",
//             age:18,
//             demo(){

//             }
//           }
//           }
// export {validateData};