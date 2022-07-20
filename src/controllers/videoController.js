export const preview = (req, res) => {
    const videos = [
        {
            title: "First Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id: 1,
        },
        {
            title: "Second Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id: 1,
        },
        {
            title: "Third Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id: 1,
        },
    ]
    res.render("home", { pageTitle: "Home", videos });  // view의 이름, 템플릿에 보낼 변수
}
export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("upload");
export const watch = (req, res) => {
    console.log(req.params);
    return res.render("watch", { pageTitle: "Watch" });
}
export const edit = (req, res) => res.send("edit");
export const deleteVideo = (req, res) => res.send("deleteVideo");