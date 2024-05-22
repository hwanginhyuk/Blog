import express from "express";
import mongoose from "mongoose";
import config from './config'
import hpp from 'hpp';
import helmet from "helmet";
import cors from 'cors';

// Routes
import postsRoutes from './routes/api/post'
import userRoutes from './routes/api/user'
import authRoutes from './routes/api/auth'
import morgan from 'morgan'

const app = express();
const { MONGO_URI } = config;

// 배포환경때 사용할 부분
// 서버의 보안적인 부분을 보완해주는 라이브러리
app.use(hpp());
app.use(helmet());
// 다른 포트의 자원을 요청해준다
app.use(cors({
    origin: true,
    credential: true
}));
// 로그설정
app.use(morgan("dev"));

app.use(express.json());

mongoose.connect(MONGO_URI, {
    // 해당을 작성하지 않으면 mongo노드에서 경고를 날린다
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // 최신의 mongoDB에서는 자동을 지원해주기 때문에 생략하여야 한다
    // useCreateIndex: true,
})
.then(()=> console.log("MongoDB connecting Success"))
.catch((e)=> console.log(e));

// Use routes
app.get('/');
app.use('/api/post', postsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

export default app;
