class UserRouter {

    constructor(router, auth, userController) {
        this.router = router;
        this.initializeRoutes(userController, auth);
        return this.router;
    }

    initializeRoutes(userController, auth) {
        this.router.route('/users')
            .get(auth.authenticate, userController.getAll)
            .post(userController.register);

        this.router.route('/users/authenticate').post(userController.login);

        //Add me
        this.router.route('/users/me').get(auth.authenticate, userController.me);
    }
}

export default UserRouter;