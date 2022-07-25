import Video from "../models/Video"

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        console.log(videos)
        return res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        return res.render("server-error", { error });
    }
}


export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload" })
}


export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    const video = new Video({
        title: title,
        description: description,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map((tag) => `#${tag}`),
        meta: {
            rating: 0,
            views: 0,
        },
    });
    await video.save();  // save(): promise를 return한다 -> save 작업이 끝날 때까지 기다려야 한다
    return res.redirect("/");
}


export const watch = (req, res) => {
    const id = req.params.id;
    return res.render("watch", { pageTitle: `${video.title}` });
}


export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle: `Editing: ${video.title}` });
}


export const postEdit = (req, res) => {
    const id = req.params.id;
    const title = req.body.title;

    return res.redirect(`/videos/${id}`);  // 동영상 수정 페이지 save 누를 시 -> 동영상 조회 페이지로 이동
}


export const deleteVideo = (req, res) => res.send("deleteVideo");

export const search = (req, res) => res.send("Search");