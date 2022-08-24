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


export const getEdit = (req, res) => {
    return res.render("edit-profile", { pageTitle: "Edit Profile" });
}


export const postEdit = async (req, res) => {
    // const id = req.session.user.id;
    // const { name, email, username, location } = req.body; 
    const {
        session: {
            user: { _id },
        },
        body: { name, email, username, location },
    } = req;

    const updatedUser = await User.findByIdAndUpdate(_id, {
        name,
        email,
        username,
        location
    }, { new: true });  // new:true; findByIdAndUpdate로 부터 업데이트 된 데이터를 return 받기 위함 

    req.session.user = updatedUser;  // 프론트는 session으로 부터 정보를 얻기 때문에 DB에서의 업데이트를 프론트에 반영시키기 위함

    /* 
    이미 있는 username이나 email이면 업데이트 할 수 없게 만들기
    username 또는 email을 변경하려 하는 지 확인 후
    이미 있는 username 또는 email이라면? 의 처리

    */

    return res.redirect("/users/edit");
}


export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/")
}


export const getChangePassword = (req, res) => {
    return res.render("users/change-password", { pageTitle: "Change Password" });  // ~/src/views 에서 찾으므로 상대url 사용하는 점, redirect()와 다르게 파일 명인 점 주의
}


export const postChangePassword = async (req, res) => {
    // 카카오톡 회원가입 유저일 경우(socialOnly === true), 비밀번호 변경 링크가 안보이게 하고 링크 이동하는 경우 막기

    const {
        session: {
            user: { _id },
        },
        body: {
            old, newPassword, newPassword2
        },
    } = req;

    const user = await User.findById(_id);

    const match = await bcrypt.compare(old, user.password);
    if (!match) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "기존 비밀번호가 일치하지 않습니다."
        });
    }

    if (newPassword !== newPassword2) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "새로운 비밀번호가 일치하지 않습니다."
        });
    }

    user.password = newPassword;
    await user.save();  // pre save middleware 작동시켜서 비밀번호를 hash 하기 위함

    return res.redirect("/users/logout");  // 비밀번호 변경 시 로그아웃되고, 로그인 페이지로 이동
}


export const see = (req, res) => res.send("see");