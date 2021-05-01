import React, { useState, useEffect } from 'react';
import { getCategories } from './apiCore';
import { prices } from './FixedPrice';
import Layout from './Layout';
import Card from './Card';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        init();
    }, []);

    const handleFilters = (filters, filterBy) => {
        console.log('Shop', filters, filterBy)
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        if (filterBy === "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }

        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        const obj = data.find(item => item._id === parseInt(value))
        array = data[obj._id].array
        // for (let key in data) {
        //     if (data[key]._id === parseInt(value)) {
        //         array = data[key].array
        //     }
        // }
        return array;
    }

    return (
        <Layout title="Shop Page" description="Search and find books of your choice" className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                    <ul>
                        <CheckBox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                    </ul>
                </div>
                {JSON.stringify(myFilters)}
                <div className="col-8">
                    <h4>Filter by prices range</h4>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shop;