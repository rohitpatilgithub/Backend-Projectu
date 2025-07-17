import { getUser } from "../service/admin.auth.js";
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';

export async function restrictToLoggedinUserOnly(req,res,next) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const userUid = req.cookies?.uid;

    if (!userUid)
        return res.sendFile(join(__dirname, '..//..//public/index.html'));

    const user = getUser(userUid);
    if (!user)
        return res.sendFile(join(__dirname, '../../public/admin/admin.html'));

    req.user = user;
    next();
}