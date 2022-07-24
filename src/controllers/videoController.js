const videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 1,
        id: 1,
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 2,
    },
]

export const preview = (req, res) => {
    res.render("home", { pageTitle: "Home", videos });  // view의 이름, 템플릿에 보낼 변수
}

export const search = (req, res) => res.send("Search");

export const upload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload" })
}

export const postUpload = (req, res) => {
    const v = {};
    v.title = req.body.uTitle;
    videos.push(v);
    console.log(videos)
    return res.redirect("/");
}

export const watch = (req, res) => {
    const id = req.params.id;
    const video = videos[id - 1];
    return res.render("watch", { pageTitle: `${video.title}`, video });
}

export const getEdit = (req, res) => {
    const { id } = req.params;  // ES6 표기법, 이렇게 쓰는구나만 알아두기
    const video = videos[id - 1];
    return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
}

export const postEdit = (req, res) => {
    const id = req.params.id;  // post request가 params로 id를 갖고있어서 가능한 것
    // console.log(req.body)
    const title = req.body.title;
    videos[id - 1].title = title;

    return res.redirect(`/videos/${id}`);  // 동영상 수정 페이지 save 누를 시 -> 동영상 조회 페이지로 이동
}

export const deleteVideo = (req, res) => res.send("deleteVideo");