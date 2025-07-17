import { getUser } from "../service/admin.auth.js";

export function authMiddlewareForAPI(req, res, next) {
    const userUid = req.cookies?.uid;

    const isApiRequest = req.originalUrl.startsWith("/api");

    if (!userUid) {
      if (isApiRequest) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        return res.redirect("/admin/login");
      }
    }

    const user = getUser(userUid);
    if (!user) {
      return res.redirect("/admin/login"); // ✅ Invalid user session
    }


    req.user = user;
    next();
}