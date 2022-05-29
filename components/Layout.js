import Head from 'next/head'
import Json from './exercises/Json'
import Recognition from './exercises/Recognition'
import Timeout from './exercises/Timeout'
import TrainerUseEffect from './exercises/TrainerUseEffect'
import Header from './Header'
import Main from './Main'
import Sidebar from './Sidebar'

export default function Layout({
  title,
  keywords,
  description,
  children,
  header,
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Sidebar />
      <Header header={header} />
      <Main>
        <TrainerUseEffect />
      </Main>
      {children}
    </div>
  )
}

Layout.defaultProps = {
  title: 'Hyber | Learn English language',
  description: 'Learn and practice English grammar',
  keywords:
    'learn english, english grammar, present simple, present countinuous, to be verb',
  header: 'Recent Activity',
}
