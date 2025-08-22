import 'module-alias/register';
import "../module-alias";
import express from 'express';
import cors from 'cors';
import V1Routes from '@/routes/index';
import { errorHandler } from "@/middlewares/errorHandler";
import morgan from "morgan"
import { config } from "@/constants/index"
import { AppError } from "@/utils/AppError";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "@/utils/swagger";


const app = express();


const corsOptions = {
    origin: "*",
    credentials: true, // Allow credentials (cookies)
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.use('/api', V1Routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 Handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler)



app.listen(config.PORT, () => {
    console.log('Application started with config Loaded up✅');
    console.log(`Server running on port ${config.PORT}`);
    console.log(`API documentation available at 📝📚 http://localhost:${config.PORT}/api-docs`);
});