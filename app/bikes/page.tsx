import {Suspense} from "react";

type Bike = {
    model: string;
    brand: string;
}

async function getBikes(): Promise<Bike[]> {
    // let data: Bike[] = [];
    // try {
    // const res = await fetch('http://127.0.0.1:8000/v1/bikes');
    // data = await res.json();
    // } catch {
    //     // error handle here
    // }
    // return data;
    return new Promise( (res)=>{
        setTimeout(async()=>{
        let data: Bike[];
        const r = await fetch('http://127.0.0.1:8000/v1/bikes');
        data = await r.json();
            res(data)
        }, 2000)
    })
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