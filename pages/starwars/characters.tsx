import Head from 'next/head'
import Link from 'next/link'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../../styles/Home.module.css'

export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const client = new ApolloClient({
        uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
        cache: new InMemoryCache()
      });

      const { data } = await client.query({
        query: gql`
          query GetPeople {
            allPeople {
                edges {
                  node {
                    id  
                    name
                    birthYear
                    eyeColor
                    gender
                    hairColor
                    height
                    mass
                    skinColor
                    homeworld {
                      name
                      diameter
                      rotationPeriod
                      orbitalPeriod
                      gravity
                      population
                      terrains
                      climates
                    }
                  }
                  cursor
                }
                totalCount
              }
          }
        `
      });

      console.log(data.allPeople)
  
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: {
          people: data.allPeople
      }
    }
  }

export default function characters(props) {
    console.log('got props', props)
    return (
    <>
    <Head>
        <title>Starwars Characters</title>
    </Head>
    <h1>Star Wars Characters</h1>
    <h2>
        <Link href="/">
            <a>Take me back home!</a>
        </Link>
    </h2>
    <div className={styles.grid}>
        {props.people.edges.map(edge => {
            return (
            <a key={edge.node.id} href="#" className={styles.card}>
                <h3>{ edge.node.name }</h3>
                <p><strong>Gender:</strong> { edge.node.gender }</p>
                <p><strong>Homeworld:</strong> { edge.node.homeworld.name }(Population: {edge.node.homeworld.population})</p>
            </a>
            );
        })}
    </div>
    </>
    )
}