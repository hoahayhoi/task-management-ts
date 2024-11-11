import { Request, Response } from "express";
import { User } from "../../models/user.model";
import md5 from "md5";
import { generateRandomString } from "../../helpers/generate.helper";

export const register = async (req: Request, res: Response) => {
    const user = req.body;

    const existUser = await User.findOne({
        email: user.email,
        deleted: false
    });

    if (existUser) {
        res.json({
            code: "error",
            message: "Email đã tồn tại trong hệ thống!"
        });
        return;
    }

    const dataUser = {
        fullName: user.fullName,
        email: user.email,
        password: md5(user.password),
        token: generateRandomString(30)
    };

    const newUser = new User(dataUser);
    await newUser.save();

    res.json({
        code: "success",
        message: "Đăng ký thành công!",
        token: newUser.token
    })
}


export const login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const existUser = await User.findOne({
        email: email,
        deleted: false
    });

    if (!existUser) {
        res.json({
            code: "error",
            message: "Email không tồn tại trong hệ thống!"
        });
        return;
    }

    if (md5(password) != existUser.password) {
        res.json({
            code: "error",
            message: "Sai mật khẩu!"
        });
        return;
    }
    
    res.json({
        code: "success",
        message: "Đăng nhập thành công!",
        token: existUser.token
    })
}