import User from "../models/User";

export const signUp = (req, res) => {
    res.render("signup", { pageTitle: "Sign up" });
}


export const postSignUp = async (req, res) => {
    const { name, email, username, password, password2, location } = req.body;

    // const exists = await User.exists({ username, email });  // 중복되는 username과 email을 동시에 갖는 User만 체크할 수 있음
    const exists = await User.exists({ $or: [{ username }, { email }] });  // $or로, username과 email 중 하나라도 중복되면(true이면) 해당 User(document)를 반환함 

    if (password !== password2) {
        return res.status(400).render("signup", {
            pageTitle: "Sign up",
            errorMessage: "password가 같지 않습니다. "
        });
    }

    if (exists) {
        return res.status(400).render("signup", {
            pageTitle: "Sign up",
            errorMessage: "username/emial이 이미 사용중입니다."
        });
    }

    await User.create({
        name,
        email,
        username,
        password,
        password2,
        location,
    })
    return res.redirect("/login");
}


export const login = (req, res) => res.send("Login");


export const logout = (req, res) => res.send("logout");


export const see = (req, res) => res.send("see");


export const edit = (req, res) => res.send("Edit");


export const remove = (req, res) => res.send("Remove");