import { getAllShipIds, getShipInfo } from "../../../lib/ships"
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/Home.module.css'


export async function getStaticPaths() {
    const paths = await getAllShipIds()
    return {
      paths,
      fallback: false //Instead of returning 404 for ids, we could fallback to on demand SSR here if we wanted to. see more https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
    }
}

export async function getStaticProps({ params }) {
    console.log(params)

    let ship = await getShipInfo(params.id)
    return {
        props: {
            ship: ship
        }
    }
}

export default function ship(props) {
    return(
        <>
        <Head>
            <title>Starwars Ship: {props.ship.name}</title>
        </Head>
        <h1>Star Wars Ship: {props.ship.name}</h1>
        <h2>
            <Link href="/starwars/ships">
                <a>Take me back to ships!</a>
            </Link>
        </h2>
        <div className={styles.gridFull}>
            <ul>
                <li><strong>ID: </strong> {props.ship.id}</li>
                <li><strong>CLASS: </strong> {props.ship.starshipClass}</li>
                <li><strong>MANUFACTURER: </strong> <ul>{ props.ship.manufacturers.map(manufacturer => {
                            return <li>{manufacturer}</li>
                        }) }</ul></li>
                <li><strong>COST: </strong> {props.ship.costInCredits}{' credits'}</li>
                <li><strong>CREW: </strong> {props.ship.crew}</li>
                <li><strong>CARGO CAP: </strong> {props.ship.cargoCapacity}</li>
                <li><strong>HYPERDRIVE RATING: </strong> {props.ship.hyperdriveRating}</li>
            </ul>
        </div>
        </>
    )
}