console.log('IMPLEMENTING BOOK ROUTER \n');

class BookRouter {

    constructor(router, bookController, middlewares) {
        this.router = router;
        this.initializeRoutes(bookController, middlewares);
        return this.router;
    }

    initializeRoutes(bookController, {auth, csrf}) {
        this.router.route('/books')
            .get(auth.authenticate, bookController.getAll)
            .post(bookController.add);
    }
}

export default BookRouter;