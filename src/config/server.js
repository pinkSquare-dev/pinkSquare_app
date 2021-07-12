import { handleError } from '../helpers/error';
import cors from 'cors'

class Server {
    constructor(express, routes, middlewares, logger) {
        this.app = express();
        this.initializeBodyParsing(express);
        this.initializeMiddlewares(middlewares, logger);
        this.initializeApplicationRouter(routes);

        this.app.use((err, req, res, next) => {
            handleError(err, res, logger);
        });
    }

    initializeBodyParsing(express) {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(cors({
            origin: "http://localhost:1234",
            credentials: true
        }))
    }

    initializeMiddlewares({ cookieParser, csrf, morgan }, logger) {
        this.app.use(cookieParser());
        this.app.use(morgan('combined', { stream: logger.stream }));
        this.app.get('/csrf', csrf, (req, res) => {
            res.status(200).json(req.csrfToken());
        })
    }

    initializeApplicationRouter(routes) {
        this.app.use(routes);
    }

    listen(port) {
        this.app.listen(port, async () => console.log(`application started on port : ${port}`));
    }
}

export default Server;