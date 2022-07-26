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
    console.log("첫 번째");

    try {
        await Video.create({
            title,
            description,
            hashtags,
        });
        console.log("마지막");
        return res.redirect("/");  // 동영상 업로드 완료 시 -> 메인 페이지로 이동
    }
    catch (error) {
        return res.render("upload", { pageTitle: "Upload", errMessage: error._message });
    }
}


export const watch = async (req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id);

    if (video === null) {
        // URI의 id값을 (24byte가 되는 선에서) 하나 변경할 경우 video에 null이 담김
        // 24byte를 넘어가면 뜨는 cannot found id 오류 해결 못함
        return res.render("404", { pageTitle: "video not found" });
    }
    return res.render("watch", { pageTitle: video.title, video: video });
}


export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
        return res.render("404", { pageTitle: "video not found" });
    }
    return res.render("edit", { pageTitle: `Edit ${video.title}`, video: video });
}


export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });  // MyModel.exists({ answer: 42 }) = MyModel.findOne({ answer: 42 }).select({ _id: 1 }).lean() 

    if (!video) {
        return res.render("404", { pageTitle: "video not found" });
    }

    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: hashtags.split(",")
            .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)),
    })

    return res.redirect(`/videos/${id}`);  // 동영상 수정 완료 시 -> 동영상 조회 페이지로 이동
}


export const deleteVideo = (req, res) => res.send("deleteVideo");

export const search = (req, res) => res.send("Search");