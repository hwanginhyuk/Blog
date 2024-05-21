import express from "express";

// Model
import Post from '../../models/post'

const router = express.Router();

// api/post
// 추가로 구분하는 이유( express 서버에 배포시 필요 )
router.get('/', async(req, res)=> {
    const postFindResult = await Post.find()
    console.log(postFindResult, "All Post Get")
    res.json(postFindResult)
})

router.post('/', async(req, res, next) => {
    try{
        console.log(req, "req")
        // 구조분해할당
        const { title, contents, fileUrl, creator } = req.body
        const newPost = await Post.create({
            title, contents, fileUrl, creator
        })
        // const newPost = await Post.create({
        //     // 원래는 이렇게 해야하지만 앞뒤가 같다면 생략해도 된다
        //     title: title, 
        //     contents: contents, 
        //     fileUrl: fileUrl, 
        //     creator: creator,
        // })
        res.json(newPost)
    }catch(e){
        console.log(e)
    }
}); 

export default router;
