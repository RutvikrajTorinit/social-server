import express from "express";
import { ROLES } from "../config/roles_list";
import {
  addPost,
  deletePost,
  getFollowingPosts,
  getUserPosts,
  getPost,
  updatePost,
} from "../controllers/postController";
import { verifyRoles } from "../middleware/verifyRoles";

const postRouter = express.Router();

postRouter.route("/").post(verifyRoles(ROLES.user), addPost);

postRouter.route("/following").get(verifyRoles(ROLES.user), getFollowingPosts);

postRouter
  .route("/(:username)?")
  .get(verifyRoles(ROLES.user, ROLES.admin), getUserPosts);

postRouter
  .route("/:id")
  .get(verifyRoles(ROLES.user, ROLES.admin), getPost)
  .delete(verifyRoles(ROLES.user, ROLES.admin), deletePost)
  .put(verifyRoles(ROLES.user), updatePost);

export default postRouter;
