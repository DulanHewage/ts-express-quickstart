import express from 'express';
import morgan from 'morgan';
import routes from "./routes/index.js";
const app = express();
const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: {
        write: (message) => console.log(message.trim()),
    },
});
app.use(morganMiddleware);
app.use(express.json());
app.use("/", routes);
// Error handling middleware
app.use((err, _req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    // You can also log the error to a file or console
    console.error(err);
    res.status(status).json({
        error: {
            message,
            status
        }
    });
    next();
});
const port = process.env.PORT || 3000;
const server = app.listen(port, async () => {
    console.log(`server started on port: ${port}`);
});
//# sourceMappingURL=server.js.map