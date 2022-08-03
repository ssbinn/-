import User from "../models/User";
import bcrypt from "bcrypt";

export const signUp = (req, res) => {
    res.render("signup", { pageTitle: "Sign up" });
}


export const postSignUp = async (req, res) => {
    const { name, email, username, password, password2, location } = req.body;
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

    try {
        await User.create({
            name,
            email,
            username,
            password,
            password2,
            location,
        })
        return res.redirect("/login");  // 회원가입 시 -> 로그인 페이지로 이동
    }
    catch (error) {
        return res.status(400).render("signup", {
            pageTitle: "Sign up",
            errMessage: error._message
        });
    }
}


export const login = (req, res) => {
    return res.render("login", { pageTitle: "Sign in to Songle" });
}


export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const pageTitle = "Sign in to Songle";

    if (!user) {  // username이 잘못된 경우
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "username을 가진 사용자가 존재하지 않습니다."
        });
    }

    // password가 잘못된 경우
    const match = await bcrypt.compare(password, user.password);  // 입력 값이 같으면 항상 같은 해시값이 나오는 특징을 이용해, 입력한 password를 해시하여 db 정보와 비교
    if (!match) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "잘못된 password 입니다."
        });
    }

    req.session.loggedIn = true;  // session.loggedIn 이 true이면 로그인한 것으로 인식
    req.session.user = user;  // 유저 정보를 세션에 추가

    return res.redirect("/");  // 로그인 시 -> 메인 페이지로 이동
};


export const logout = (req, res) => res.send("logout");


export const see = (req, res) => res.send("see");


export const edit = (req, res) => res.send("Edit");


export const remove = (req, res) => res.send("Remove");