import Video from "../models/Video"

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", { pageTitle: "Home", videos: [] });
    } catch (error) {
        return res.render("server-error", { error });
    }
}

export const search = (req, res) => res.send("Search");

export const upload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload" })
}

export const postUpload = (req, res) => {
    const v = {};
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