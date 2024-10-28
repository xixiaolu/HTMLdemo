import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/HelloWorld.vue";
import About from "../components/About.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { 
            path: '/login',
            component : ()=> import("../views/Login.vue")
        }
    ]
});
export default router;

