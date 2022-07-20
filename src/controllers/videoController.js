export const preview = (req, res) => {
    res.render("home", { pageTitle: "Home" });  // view의 이름, 템플릿에 보낼 변수
}
export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("upload");
export const watch = (req, res) => {
    console.log(req.params);
    return res.render("watch");
}
export const edit = (req, res) => res.send("edit");
export const deleteVideo = (req, res) => res.send("deleteVideo");