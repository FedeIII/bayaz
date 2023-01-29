import { prisma } from "~/db.server";

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(slug) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(post) {
  return prisma.post.create({ data: post });
}
