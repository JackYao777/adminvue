// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import Login from '../components/Login.vue'
import ShiPin from '@/view/Vedio/shipin.vue';
import store from '../store'
import { GetUserRoutersApi, GetMenuInfoApi, GetMenuInfoRawApi } from '@/request/api';

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
			// 	name: 'menu',
			// 	path: 'menu',
			// 	component: () => import('@/view/Menu/MenuIndex.vue'),
			// 	meta: {
			// 		title: '添加菜单',
			// 		titles: ['添加菜单']
			// 	}
			// },
		]
	},
	{
		name: 'login',
		path: '/Login',
		component: Login
	},
	// {
	// 	name: 'shipin',
	// 	path: '/ShiPin',
	// 	component: ShiPin
	// },
	{
		path: "*",
		component: () => import('@/view/404.vue'),
	}
	// {
	// 	path: "/401",
	// 	component: () => import('@/view/401.vue'),
	// }
];

//创建并暴露一个路由器
const router = new VueRouter({
	mode: 'hash',
	routes: routesData
});

function isHasMenuFuc(data, to) {
	if (data.filter(x => to.path === x.menuUrl).length > 0)
		return true;
	return false;
}

function getRouteDatas(data) {
	let routedatas = [];
	if (data.menuType == 2) {
		// if (item.menuName === '首页')
		routedatas.push({
			path: data.menuUrl,
			component: () => import(`@/view/${data.component}`),
			meta: {
				titles: [data.menuName]
			}
		});
	}
	else {
		data.children.map(sitem => {
			if (sitem.menuType == 2) {
				var btnDatas = [];
				sitem.children.map(ssitem => {
					if (ssitem.menuType == 3) {
						btnDatas.push(ssitem);
					}
				});
				routedatas.push({
					path: sitem.menuUrl,
					component: () => import(`@/view/${sitem.component}`),
					meta: {
						titles: [data.menuName, sitem.menuName],
						btnDatas: btnDatas
					}
				});
			}
			routedatas.push(...getRouteDatas(sitem))
		});
	}
	return routedatas;
}

function getMenuDatas(res) {
	let menuDatas = [];
	res.map(item => {
		if (item.children) {
			menuDatas.push({
				title: item.menuName,
				path: item.menuUrl,
				meta: { icon: item.menuIcon, menuType: item.menuType },
				children: getMenuDatas(item.children)
			});
		}
		else {
			//这里要排除掉按钮级别
			if (item.menuType != 3) {
				menuDatas.push({
					title: item.menuName,
					path: item.menuUrl,
					meta: { icon: item.menuIcon, menuType: item.menuType },
					children: []
				});
			}
		}
	})
	return menuDatas;
}

router.beforeEach(async (to, from, next) => {
	// console.log('看卡进', to.path)
	//管理系统常见的两个经典的逻辑
	//有token,不需要进login页面，没token进入登入页面
	const token = localStorage.getItem('edb-authorization-token');
	// console.log("token",!token)
	if (to.path === '/Login' && token) {
		next('/');
		return;
	}
	if (to.path !== '/Login' && !token) {
		console.log('这里应该去login页面')
		next('/Login');
		return;
	}

	if(token){
		//发现菜单长度为0那就去请求菜单数据
	// console.log('存储的menudata', store.state.menuDatas.menuData)
	if (token && store.state.menuDatas.menuData.length == 0) {
		let res = await GetMenuInfoApi();//树形结构
		let resRaw = await GetMenuInfoRawApi();//非树形结构
		console.log('store.state.userInfo.userInfo.adminID', store.state.userInfo.userInfo.adminID)
		let routerDatas = await GetUserRoutersApi({ adminId: store.state.userInfo.userInfo.adminID })
		console.log('这里看看用户返回的路由数据', routerDatas)
		res = res.data

		let newUserMenuData = [
			// 	{
			// 	title: '首页', path: '/home', meta: {
			// 		title: '首页'
			// 	}
			// }
		];
		// console.log('菜单res', res)
		// let ret = res.map(item => {
		// 	if (item.children) {
		// 		return {
		// 			title: item.menuName,
		// 			path: item.menuUrl,
		// 			meta: { icon: item.menuIcon },
		// 			children: item.children.map(sitem => {
		// 				return {
		// 					title: sitem.menuName,
		// 					// path: '/' + item.menuUrl + '/' + sitem.menuUrl,
		// 					path: sitem.menuUrl,
		// 					meta: { icon: sitem.menuIcon }
		// 				}
		// 			})
		// 		}
		// 	}
		// 	else {
		// 		//这里要排除掉按钮级别
		// 		if (item.menuType != 3) {
		// 			return {
		// 				title: item.menuName,
		// 				path: item.menuUrl,
		// 				meta: { icon: item.menuIcon }
		// 			}
		// 		}
		// 	}
		// })
		let ret = getMenuDatas(res);
		newUserMenuData = [...newUserMenuData, ...ret];
		// console.log('这里看看菜单数据', newUserMenuData)
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
				component: () => import('@/view/Profile/Profile.vue')
			}
		];
		// console.log('res', res)

		if (routerDatas.data) {
			await routerDatas.data.forEach(item => {
				//这里应该得判断如果是目录得话就不需要路由,是菜单得话就得加路由,按钮也不需要加路由
				ret = getRouteDatas(item);
				// console.log('看看这里ret得数据是多少', ret)
				// let ret = item.children.map(sitem => {
				// 	var btnDatas=[];
				// 	sitem.children.map(ssitem=>{
				//         if(ssitem.menuType==3){
				// 			btnDatas.push(ssitem);
				// 		}
				// 	});
				// 	return {
				// 		path: sitem.menuUrl,
				// 		component: () => import(`@/view/${sitem.component}`),
				// 		meta: {
				// 			titles: [item.menuName, sitem.menuName],
				// 			btnDatas:btnDatas
				// 		}
				// 	}
				// })

				newChildrenRouters = [...newChildrenRouters, ...ret];
			});
			// console.log('路由数据', newChildrenRouters)

			newChildrenRouters.forEach(item => {
				router.addRoute('mainlayout', item);
			});
		}
		else {
			router.addRoute('mainlayout', {
				name: 'home',
				path: '/home',
				component: () => import('@/view/Customer/Customer.vue'),
				meta: {
					titles: ['首页']
				}
			});
			router.addRoute('mainlayout', {
				name: '401',
				path: '/error/401',
				component: () => import('@/view/401.vue'),
				meta: {
					titles: ['未授权页面']
				}
			});
		}
		next(to.path);
		return;
	}

	//这里还得添加一个逻辑,如果路由不包含在路由数据里面或者菜单数据里面,那就进未授权页面或者404页面
	// console.log('氨丝光', store.state.menuDatas.menuData)
	let isHasMenu = false;
	isHasMenu = isHasMenuFuc(store.state.menuDatas.rawMenuData, to)
	if (isHasMenu) {
		var routersData = router.getRoutes();
		console.log('routersData', routersData)
		//看有没有路由权限,没有就跳转另一个页面
		if (routersData.filter(x => x.path === to.path).length <= 0) { next('/error/401'); return; }
	}
	}
	next();
});

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {
	document.title = to.meta.title || '后台系统'
})

export default router;
