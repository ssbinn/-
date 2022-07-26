import Video from "../models/Video"

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", { pageTitle: "Home", videos });
    }
    catch (error) {
        return res.render("server-error", { error });
    }
}


export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload" });
}


export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title: title,
            description: description,
            hashtags: hashtags.split(",").map((tag) => `#${tag}`),
        });

        return res.redirect("/");
    }
    catch (error) {
        return res.render("upload", { pageTitle: "Upload", errMessage: error._message });
    }
}


export const watch = async (req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id);
    return res.render("watch", { pageTitle: video.title, video: video });
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