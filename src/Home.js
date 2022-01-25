import React, { useEffect, useState } from 'react'
import { collection, query, getDocs } from "firebase/firestore";
import { db } from './firebase/auth';

function Home() {
    const [ data,setData ] = useState(null)

    useEffect(() => {    
        const getPosts = async() => {
            const q = query(collection(db, "posts"));

            const querySnapshot = await getDocs(q);
            const array = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                array.push({
                    id:doc.id,
                    ...doc.data()
                })
            });
            console.log(array);
            setData(array)
        }
        getPosts()

    }, [])
    return (
        <div>
            {data&&data.map((x) => <div key={x.id}>
                <div className="">{x.id}</div>
                <div>{x.name}</div>
                <div>{x.audio}</div>
                </div>)}
        </div>
    )
}

export default Home
