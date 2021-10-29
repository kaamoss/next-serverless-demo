import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

async function getShipsData() {
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
      return data
}

export async function getShipInfo(id: string) {
    const data = await getShipsData()

    let foundShip = null
    data.allStarships.edges.forEach(edge => {
        if(edge.node.id == id) {
            foundShip = edge.node
        }
    })

    if(foundShip == null) {
        //TODO: throw some 404 or other error here
    }

    return foundShip
}

export async function getAllShipIds() {
    const data = await getShipsData()

      return data.allStarships.edges.map(edge => {
          return {
              params: {
                  id: edge.node.id
              }
          }
      })


}