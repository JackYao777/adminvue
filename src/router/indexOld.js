// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import Login from '../components/Login.vue'
import store from '../store'
import { GetUserRoutersApi, GetMenuInfoApi,GetMenuInfoRawApi } from '@/request/api';

//解决重定向报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

const routesData = [
	{
		path: '/',
		name: 'mainlayout',
		component: () => import('@/view/layout/MainLayout.vue'),
		// component: () => import('@/view/Customer/Customer.vue'),
		redirect: 'home',
		children: [
			// {
			// 	name: 'home',
			// 	path: 'home',
			// 	component: () => import('@/view/Customer/Customer.vue'),
			// 	meta: {
			// 		title: '首页',
			// 		titles: ['首页']
			// 	}},
			// },
			// {
			// 	name: 'user',
			// 	path: 'user',
			// 	component: () => import('@/view/User/UserIndex.vue'),
			// 	meta: {
			// 		title: '用户',
			// 		titles: ['用户']
			// 	}
			// },
			// {
			// 	name: 'addUser',
			// 	path: 'addUser',
			// 	component: () => import('@/view/User/AddUser.vue'),
			// 	meta: {
			// 		title: '添加用户',
			// 		titles: ['添加用户']
			// 	}
			// },
			// {
			// 	name: 'role',
			// 	path: 'role',
			// 	component: () => import('@/view/Role/RoleIndex.vue'),
			// 	meta: {
			// 		title: '添加角色',
			// 		titles: ['添加角色']
			// 	}
			// },
			// {
			// 	name: 'menu',
			// 	path: 'menu',
			// 	component: () => import('@/view/Menu/MenuIndex.vue'),
			// 	meta: {
			// 		title: '添加菜单',
			// 		titles: ['添加菜单']
			// 	}
			// },
		]
		// children: [
		// 	{
		// 		name: 'home',
		// 		path: 'home',
		// 		component: () => import('@/components/HelloWorld.vue')
		// 	},
		// 	{
		// 		name: 'customer',
		// 		path: 'customer/customerOne',
		// 		component: () => import('@/components/HelloWorld.vue')
		// 	},
		// 	{
		// 		name: 'customerTwo',
		// 		path: 'customer/customerTwo',
		// 		component: () => import('@/view/Customer/Customer.vue')
		// 	}
		// ]
	},
	{
		name: 'login',
		path: '/Login',
		component: Login
	},
	{
		path: "*",
		component: () => import('@/view/NoAuth.vue')
	},
	{
		path: "/NoAuth",
		component: () => import('@/view/NoAuth.vue')
	}
];

//创建并暴露一个路由器
const router = new VueRouter({
	mode: 'hash',
	routes: routesData
});

function isHasMenuFuc(data,to) {
	console.log('看看原始的菜单数据',data)
 	if(data.filter(x=>to.path.endsWith(x.menuUrl)).length>0)
		return true;
	   return false;
	//  if(data.filter(x=>x.path==to.path))
	// let isHasMenu = false;
	// data.map(item => {
	// 	if (item.path === to.path.endwith) {
	// 		console.log('妥妥进来了啊')
	// 		return isHasMenu = true;
	// 	}
	// 	if (item.children > 0) {
	// 		isHasMenuFuc(item.children, to)
	// 	}
	// },
	// )
	// return isHasMenu;
}

router.beforeEach(async (to, from, next) => {
	console.log('看卡进', to.path)
	//管理系统常见的两个经典的逻辑
	//有token,不需要进login页面，没token进入登入页面
	const token = localStorage.getItem('edb-authorization-token');
	if (to.path === '/Login' && token) {
		next('/');
		return;
	}
	if (to.path !== '/Login' && !token) {
		next('/Login');
		return;
	}


	// if (token && store.state.menuDatas.menuData.length == 0) {
	// 	//发现菜单长度为0那就去请求菜单数据
	// 	let res =await GetUserRoutersApi();
	// 	console.log('确实进来了')
	// }
	// console.log('没进来啊啊啊啊啊')
	console.log('存储的menudata', store.state.menuDatas.menuData)
	if (token && store.state.menuDatas.menuData.length == 0) {
		let res = await GetMenuInfoApi();
		let resRaw= await GetMenuInfoRawApi();
		res = res.data
	
		let newUserMenuData = [
			// 	{
			// 	title: '首页', path: '/home', meta: {
			// 		title: '首页'
			// 	}
			// }
		];
		console.log('菜单res', res)
		let ret = res.map(item => {
			if (item.children) {
				return {
					title: item.menuName,
					path: item.menuUrl,
					meta: { icon: item.menuIcon },
					children: item.children.map(sitem => {
						return {
							title: sitem.menuName,
							path: '/' + item.menuUrl + '/' + sitem.menuUrl,
							meta: { icon: sitem.menuIcon }
						}
					})
				}
			}
			else {
				return {
					title: item.menuName,
					path: item.menuUrl,
					meta: { icon: item.menuIcon }
				}
			}
		})
		newUserMenuData = [...newUserMenuData, ...ret];
		console.log('这里看看菜单数据', newUserMenuData)
		store.commit('menuDatas/changeMenuData', newUserMenuData);
		store.commit('menuDatas/initalRawMenuData', resRaw.data);
		//以上 -- 生成菜单数据
		//以下----生成用户可以访问的路由数据
		let newChildrenRouters = [
			// {
			// 	path: "/home",
			// 	meta: { titles: ['首页'] },
			// 	component: () => import('@/components/HelloWorld.vue')
			// },
			{
				path: "/profile",
				meta: { titles: ['个人中心'] },
				component: () => import('@/view/profile.vue')
			}
		];
		console.log('res', res)
		await res.forEach(item => {
			let ret = item.children.map(sitem => {
				console.log(sitem.component.toString())
				return {
					path: '/' + item.menuUrl + '/' + sitem.menuUrl,
					component: () => import(`@/view/${sitem.component}`),
					meta: {
						titles: [item.menuName, sitem.menuName]
					}
				}
			})
			if (item.menuName === '首页')
				ret.push({
					path: item.menuUrl,
					component: () => import(`@/view/${item.component}`),
					meta: {
						titles: [item.menuName]
					}
				});
			newChildrenRouters = [...newChildrenRouters, ...ret];
		});
		console.log('路由数据', newChildrenRouters)

		newChildrenRouters.forEach(item => {
			router.addRoute('mainlayout', item);
		});
		next(to.path);
		return;
	}

	//这里还得添加一个逻辑,如果路由不包含在路由数据里面或者菜单数据里面,那就进未授权页面或者404页面
	console.log('氨丝光', store.state.menuDatas.menuData)
	let isHasMenu = false;
	isHasMenu = isHasMenuFuc(store.state.menuDatas.rawMenuData, to)
	 if(isHasMenu){
		var routersData=router.getRoutes();
		//看有没有路由权限,没有就跳转另一个页面
		if(routersData.filter(x=>x.path==to.path).length<=0) {next('/NoAuth'); return;}
	 }
	//  if(store.state.menuDatas.menuData.filter(x=>x.path===to.path).length>0)
	// 	{
	// 		console.log('那就是有数据',to.path)
	// 	}
	// 	else{
	// 		console.log('那就是没数据',to.path)
	// 	}

	next();
});

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {
	document.title = to.meta.title || '后台系统'
})

export default router;
