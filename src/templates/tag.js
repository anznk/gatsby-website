import React from 'react'
import { graphql } from 'gatsby'
import { startCase, orderBy } from 'lodash'
import SEO from '../components/SEO'
import moment from 'moment'
import Layout from '../components/Layout'
import Card from '../components/Card'
import CardList from '../components/CardList'
import PageTitle from '../components/PageTitle'
import Pagination from '../components/Pagination'
import Container from '../components/Container'

const TagTemplate = ({ data, pageContext }) => {
  // console.log("data",data);
  // console.log("pageContext",pageContext);
  const posts = orderBy(
    data.contentfulTag.post,
    // eslint-disable-next-line
    [object => new moment(object.publishDateISO)],
    ['desc']
  )
// console.log("posts",posts);
  const { title } = data.contentfulTag
  const numberOfPosts = posts.length
  const skip = pageContext.skip
  const limit = pageContext.limit
  const { humanPageNumber, basePath } = pageContext

  let ogImage
  try {
    ogImage = posts[0].heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }

  return (
    <>
      <Layout>
        <SEO
          title={`Tag: ${startCase(title)}`}
          description={`Posts Tagged: ${startCase(title)}`}
          image={ogImage}
        />
        <Container>
        <div>aaaaa</div>
          {/* <PageTitle small>
            {numberOfPosts} Posts Tagged: &ldquo;
            {title}
            &rdquo;
          </PageTitle> */}
          <CardList>
            {posts.slice(skip, limit * humanPageNumber).map(post => (
              <Card {...post} key={post.id} basePath={basePath} />
            ))}
          </CardList>
        </Container>
        <Pagination context={pageContext} />
      </Layout>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulTag(slug: { eq: $slug }) {
      title
      id
      slug
      post {
        id
        title
        slug
        publishDate(formatString: "MMMM DD, YYYY")
        publishDateISO: publishDate(formatString: "YYYY-MM-DD")
        heroImage {
          title
          fluid(maxWidth: 1800) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
          ogimg: resize(width: 1800) {
            src
          }
        }
        body {
          childMarkdownRemark {
            timeToRead
            html
            excerpt(pruneLength: 80)
          }
        }
      }
    }
  }
`

export default TagTemplate
