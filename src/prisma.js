import { Prisma } from  'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

const createPostForUser = async (authorId, data) => {
  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{ id }')
  const user = await prisma.query.user({
    where: {
      id: authorId
    }
  }, '{ id name email posts { id title published } }')
  return user
}

// createPostForUser("ckl7b9wnm00cd0971a957nsqf", {
//   title: "Great Books to Read",
//   body: "The War of Art",
//   published: true
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// })

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost({
    where: {
      id: postId
    },
    data
  }, '{ author { id } }')
  const user = await prisma.query.user({
    where: {
      id: post.author.id
    }
  }, '{ id name email posts { id title published }}')
  return user
}

updatePostForUser("ckl7dkdor00gt0971ov1dchlw", { published: false}).then((user) => {
  console.log(JSON.stringify(user, undefined, 2))
})

// prisma.mutation.createPost({
//   data: {
//     title: "GraphQL 101",
//     body: "",
//     published: false,
//     author: {
//       connect: {
//         id: "ckl7aealj006n0971rb3l3d53"
//       }
//     }
//   }
// }, '{ id title body published }').then((data) => {
//   console.log(data)
//   return prisma.query.users(null, '{ id name posts { id title }}')
// }).then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.updatePost({
//   where: {
//     id: "ckl7dkdor00gt0971ov1dchlw"
//   },
//   data: {
//     body: "Here a change to the body.",
//     published: true
//   }
// }, '{ id }').then((data) => {
//   return prisma.query.posts(null, '{ id title body published }')
// }).then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })