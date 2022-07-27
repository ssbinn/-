import Video from "../models/Video"

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" });
        return res.render("home", { pageTitle: "Home", videos });
    }
    catch (error) {
        return res.render("server-error", { error });
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


export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload" });
}


export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;

    try {
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");  // 동영상 업로드 완료 시 -> 메인 페이지로 이동
    }
    catch (error) {
        return res.render("upload", { pageTitle: "Upload", errMessage: error._message });
    }
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
        hashtags: Video.formatHashtags(hashtags),
    })

    return res.redirect(`/videos/${id}`);  // 동영상 수정 완료 시 -> 동영상 조회 페이지로 이동
}


export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];

    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i") // contain 방식의 regular expression 생성, i: 대소문자 무시
            }
        });
    }
    return res.render("search", { pageTitle: "Search", videos });
}