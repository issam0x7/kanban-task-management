const { Router } = require("express");
const usersRoutes = require('./userRouter')
const boardsRoutes = require('./boardRoutes')
const tasksRoutes = require('./tasksRoutes')



const router = Router();


const defaultRoutes = [
    {
        path : "/users",
        route : usersRoutes
    },
    {
        path : "/boards",
        route : boardsRoutes
    },
    {
        path : "/tasks",
        route : tasksRoutes
    },
]


defaultRoutes.map((route) => {
    router.use(route.path, route.route);
})


module.exports =  router;