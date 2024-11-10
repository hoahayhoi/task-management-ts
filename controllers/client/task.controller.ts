import { Request, Response } from "express";
import { Task } from "../../models/task.model";

export const index = async (req: Request, res: Response) => {
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find["status"] = req.query.status;
    }


    //Sort 
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[`${req.query.sortKey}`] = req.query.sortValue;
    }
    //End Sort 

    // Pagination
    let limitItems = 4;
    let page = 1;

    if (req.query.page) {
        page = parseInt(`${req.query.page}`);
    }

    if (req.query.limit) {
        limitItems = parseInt(`${req.query.limit}`);
    }

    const skip = (page - 1) * limitItems;
    // End Pagination

    const tasks = await Task
        .find(find)
        .limit(limitItems)
        .skip(skip)
        .sort(sort);

    res.json(tasks);
}


export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    });
    res.json(task);
}

export const changeMultiPatch = async (req: Request, res: Response) => {
    const status = req.body.status;
    const ids = req.body.ids;

    await Task.updateMany({
        _id: { $in: ids }
    }, {
        status: status
    });

    res.json({
        code: "success",
        message: "Thành công!"
    })
}

export const createPost = async (req: Request, res: Response) => {
    const data = req.body;
    const task = new Task(data);
    await task.save();

    res.json({
        code: "success",
        message: "Tạo công việc thành công!",
        data: task
    });
}

