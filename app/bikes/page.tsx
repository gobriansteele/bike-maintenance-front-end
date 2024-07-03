import {Suspense} from "react";

type Bike = {
    model: string;
    brand: string;
}

async function getBikes(): Promise<Bike[]> {
    const token = sessionStorage.getItem('bike_access_token')
    if(!token) {
        throw new Error('Not authenticated')
    }
    let data: Bike[] = [];
    try {
    const res = await fetch('http://127.0.0.1:8000/v1/bikes', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    data = await res.json();
    } catch {
        // error handle here
    }
    return data;

}

export default  function Bikes() {
    return (
        <Suspense fallback={'loading'}>

        <BikeList/>
        </Suspense>
    );
}


async function BikeList() {
    const bikes = await getBikes()
    return (
        <div>
            {
                bikes.map(bike => {
                    return <div key={bike.model}>{bike.brand} {bike.model}</div>
                })
            }</div>
    )

}