import React, { useEffect, useState } from 'react'

const Wishlist =() => {
    const [Wishlist, setWishlist] = useState([]);

    useEffect (() =>{
        //fetch wishlist item for a user        
        axios
        .get("/api/wishlist/user01")
        .then(response => setWishlist(response.data))
        .catch((error) => console.error("Error fetching wishlist", error));
    },[]);

    const handleRemove = (id) => {
        axios
            .delete('/api/wishlist/${id}')
            .then (() => setWishlist(Wishlist.filter((item) => item.id !== id)))
            .catch((error) => console.error("Error removing item",error));
    };

    return (
        <div className="wishlist">
            <h1 className="wishlist_title">Your Wishlist</h1>
            <div className="wishlist_items">
                {
                    Wishlist.map((item) => (
                        <div className="wishlist_item" key={item.id}>
                            <img src="{item.imageUrl}" alt="{item.productName}" className='wishlist_img'/>
                            <div className="wishlist_info">
                                <h3>{item.productName}</h3>
                                <p>${item.price}</p>
                            </div>
                            <button onClick={() => handleRemove(item.id)} className='wishlist_remove'>
                                Remove
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Wishlist;