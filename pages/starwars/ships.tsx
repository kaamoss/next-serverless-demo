import Head from 'next/head'
import Link from 'next/link'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../../styles/Home.module.css'

export async function getServerSideProps(context) {
    console.log('getting server site props with context:', context)
    // Get external data from the file system, API, DB, etc.
    const client = new ApolloClient({
        uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
        cache: new InMemoryCache()
      })

      const { data } = await client.query({
        query: gql`
          query GetStarships {
            allStarships {
                totalCount
                edges {
                  node {
                    name
                    model
                    starshipClass
                    manufacturers
                    costInCredits
                    crew
                    hyperdriveRating
                    cargoCapacity
                    id
                  }
                }
              }
          }
        `
      })

      console.log(data.allStarships)

    return {
        props: {
            ships: data.allStarships
        }
    }
  }

 export default function ships(props) {
    console.log('got props', props)
    return (
        <>
        <Head>
            <title>Starwars Ships</title>
        </Head>
        <h1>Star Wars Ships!</h1>
        <h2>
            <Link href="/">
                <a>Take me back home!</a>
            </Link>
        </h2>
        <div className={styles.grid}>
            {props.ships.edges.map(edge => {
                return (
                <a key={edge.node.id} href={'/starwars/ship/'+edge.node.id} className={styles.card}>
                    <h3>{ edge.node.name }</h3>
                    <p><strong>Model:</strong> { edge.node.model }</p>
                    <p><strong>Cost:</strong> { edge.node.costInCredits }{' credits'}</p>
                    <p><strong>Manufacturer(s):</strong> <ul>
                        { edge.node.manufacturers.map(manufacturer => {
                            return <li key={manufacturer}>{manufacturer}</li>
                        }) }
                        </ul></p>
                    <p><strong>Class:</strong> { edge.node.starshipClass }</p>
                    <p>(<strong>Hyperdrive rating</strong>: {edge.node.hyperdriveRating}, <strong>Cargo Capacity</strong>: {edge.node.cargoCapacity} )</p>
                </a>
                );
            })}
        </div>
        </>
    )
 } 