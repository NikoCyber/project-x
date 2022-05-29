import { parseJson } from '../lib/phrases'

import play from '../public/json/play_1.json'

export default function Json() {
  return (
    <div>
      {play.verbs.map((i) => (
        <div key={i.id}>{i.text}</div>
      ))}
    </div>
  )
}

// export async function getStaticProps() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users')
//   const posts = await res.json()
//   console.log(posts)

//   return {
//     props: { posts },
//   }
// }
