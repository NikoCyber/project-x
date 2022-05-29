// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const posts = await res.json()
  console.log(posts)

  //   return {
  //     props: { posts },
  //   }
}
