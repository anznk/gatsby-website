import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import PageBody from '../components/PageBody'
import SEO from '../components/SEO'
import { startCase } from 'lodash'
import "../styles/posts.scss"
import TagLists from '../components/TagLists'

const StyledImg = styled(Img)`
  width: 120px;
  height: auto;
  border-radius: 50%;
`

const Posts = ({ data, pageContext }) => {
  const posts = data.allContentfulPost.edges
  const about = data.contentfulPage
  console.log("about", about);
  const { humanPageNumber, basePath } = pageContext
  const isFirstPage = humanPageNumber === 1
  let featuredPost
  let ogImage

  try {
    featuredPost = posts[0].node
  } catch (error) {
    featuredPost = null
  }
  try {
    ogImage = posts[0].node.heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }

  return (
    <Layout>
      <SEO title={startCase(basePath)} image={ogImage} />

      <Container>
        {/* <TagLists /> */}
        {/* {tags && <TagList tags={tags} basePath={basePath} />} */}
        <div className="hero">
          <div className="picture">
            <div className="square">
              <p>Life in Vancouver</p>
            </div>
          </div>
        </div>
        <Link to="/tag/obedient/">obedient</Link>
        {/* <TagTemplate tags="obedient" basePath="/tag/" /> */}
          <CardList>
            {posts.map(({ node: post }) => (
              <Card key={post.id} {...post} basePath={basePath} />
            ))}
          </CardList>
          <Pagination context={pageContext} />
          <div>
          <p>{about.title}</p>
          <StyledImg fluid={about.heroImage.fluid} />
          {/* <Img
            className={styles.heroImage}
            alt={about.heroImage}
            fluid={about.heroImage.fluid}
          /> */}
          <PageBody body={about.body} />
          </div>
      </Container>
      
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "MMMM DD, YYYY")
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
    contentfulPage(slug: { eq: "about" }) {
      title
      slug
      metaDescription {
        internal {
          content
        }
      }
      body {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
        }
      }
      heroImage {
        title
        fluid(maxWidth: 200) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
        ogimg: resize(width: 200) {
          src
        }
      }
    }
  }
`

export default Posts
