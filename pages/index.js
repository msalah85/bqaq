import Home from '../components/home/Home';
import PageHeader from '../seo/PageHeader'

function Index(props) {

  return (
    <>
      <PageHeader index='home' />
      <Home />
    </>
  )
}


export default Index;