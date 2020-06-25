import React from 'react'

export class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isProductsLoaded: false,
            isCategoriesLoaded: false,
            items: [],
            productPopup: [],
            showProductPopup: false,
            categories: [],
            showCategories: false,
            filterByCategory: "",
            searchFilter: "",
            currentPage: 1,
            firstProduct: 0,
            lastProduct: 6,
        };

        this.showPopup = this.showPopup.bind(this)
        this.setPagination = this.setPagination.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:2567/products/v2.0/products")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isProductsLoaded: true,
                        items: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isProductsLoaded: true,
                        error
                    });
                }
            )

        fetch("http://localhost:2567/products/v2.0/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isCategoriesLoaded: true,
                        categories: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isCategoriesLoaded: true,
                        error
                    });
                }
            )
    }

    searchFilter = e => {
        this.setState({searchFilter: e.target.value})
    }

    showPopup(productPopup) {
        this.setState({productPopup, showProductPopup: true})
        document.body.style.overflow = "hidden"
    }

    closePopup = () => {
        this.setState({productPopup: [], showProductPopup: false})
        document.body.style.overflow = "auto"
    }

    toggleCategories = () => {
        this.setState({showCategories: !this.state.showCategories})
    }

    setPagination(currentPage, firstProduct, lastProduct) {
        console.log(currentPage, firstProduct, lastProduct)
        this.setState({currentPage, firstProduct, lastProduct}, () => {console.log(currentPage, firstProduct, lastProduct)})
    }

    render() {
        let products = []

        this.state.items.map(item => {
            const categoryTitlesArray = this.state.categories.filter(category => {
                return item.categories.find(itemCategory => category.id === itemCategory)
            })

            const categoryTitles = []
            categoryTitlesArray.forEach(category => {
                categoryTitles.push(category.title)
            })

            item.categoryTitles = categoryTitles
        })

        if ( this.state.filterByCategory !== "" ) {
            products = this.state.items.filter(item => {
                return item.categoryTitles.find(categoryTitle => categoryTitle === this.state.filterByCategory)
            })
        } else {
            products = this.state.items
        }

        if ( this.state.searchFilter !== "") {
            products = products.filter(item => {
                return item.title.includes(this.state.searchFilter) || item.description.includes(this.state.searchFilter)
            })
        }

        return (
            <div>
                <h1 className="title">Menu</h1>
                <div className="category-first-wrapper">
                    {this.state.categories.slice(0, 12).map(category => (
                        <p key={category.id} className={this.state.filterByCategory === category.title ? "category filtered" : "category"}
                           onClick={() => {
                               if ( this.state.filterByCategory === category.title ) {
                                   this.setState({filterByCategory: ""})
                               } else {
                                   this.setState({filterByCategory: category.title})
                               }
                           }}>{category.title}</p>
                    ))}
                </div>
                <span className={this.state.showCategories ? "toggle-categories-button hide" : "toggle-categories-button"} onClick={this.toggleCategories}>...</span>
                <div className={this.state.showCategories ? "category-rest-wrapper show-categories" : "category-rest-wrapper hide"}>
                    {this.state.categories.slice(12).map(category => (
                        <p key={category.id} className={this.state.filterByCategory === category.title ? "category filtered" : "category"}
                           onClick={() => {
                               if ( this.state.filterByCategory === category.title ) {
                                   this.setState({filterByCategory: ""})
                               } else {
                                   this.setState({filterByCategory: category.title})
                               }
                           }}>{category.title}</p>
                    ))}
                </div>
                <div className={this.state.showCategories ? "show-categories" : "hide"}>
                    <img src="https://ip4t.net/wp-content/themes/appdev/images/icons/icomoon/svg/arrow-left3.svg"
                         className="categories-hide-button"
                         width="15px"
                         height="15px"
                         onClick={this.toggleCategories}/>
                </div>

                <div className="title-search-wrapper">
                    <p className="title-search">Search: </p>
                    <input type="text" className="title-search-input"
                           value={this.state.searchFilter} onChange={e => this.searchFilter(e)}/>
                </div>

                <div className="grid">
                    {products.slice(this.state.firstProduct, this.state.lastProduct).map(item => (
                        <div className="product-wrapper" key={item.id}>
                            <div className="product">
                                <h2 className="show-product-title">{item.title}</h2>
                                {item.description.length > 270 ?
                                    <p>
                                        {item.description.substring(0, 270)}
                                        <button onClick={() => this.showPopup(item)} className="popup-button">... (continue reading)</button>
                                    </p>
                                    :
                                    <p>{item.description}</p>
                                }
                                {item.categoryTitles.length > 0 ?
                                    <p>categories: {item.categoryTitles.join(', ')}</p> : " "
                                }
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination products={products} currentPage={this.state.currentPage} setPagination={this.setPagination}/>

                <div className={this.state.showProductPopup ? "popup-wrapper show" : "popup-wrapper hide"}>
                    <div className="popup">
                        <div className="popup-content">
                            {this.state.showProductPopup ? <ProductPopup closePopup={this.closePopup} product={this.state.productPopup}/> : ""}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ProductPopup extends React.Component {
    constructor(props) {
        super(props);
        this.props = props
    }

    render () {
        return (
            <div>
                <div className="close-popup" onClick={this.props.closePopup}>X</div>
                <h2 className="show-product-title">{this.props.product.title}</h2>
                    {this.props.product.description}
                    {this.props.product.categoryTitles.length > 0 ?
                        <p>categories: {this.props.product.categoryTitles.join(', ')}</p>
                        :
                        " "
                    }
            </div>
        )
    }
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.props = props
    }

    render () {
        let numberOfPages = Math.ceil(this.props.products.length/6)
        let currentPage = this.props.currentPage
        let previousPage = currentPage - 1
        let nextPage = currentPage + 1
        let secondNextPage = currentPage + 2

        console.log(nextPage, nextPage*6, nextPage*6 + 6)

        return(
            <div className="pagination-wrapper">
                <div className="pagination-content">
                    <a href="#" onClick={() => {this.props.setPagination(previousPage, previousPage*6, previousPage*6 + 6)}}>
                        {previousPage? "Previous Page " : ""}
                    </a>

                    <a href="#" onClick={() => {this.props.setPagination(1, 0, 6)}}>
                        {currentPage > 3? 1 + " . " : ""}
                    </a>
                    <a href="#" onClick={() => {this.props.setPagination(previousPage, previousPage*6, previousPage*6 + 6)}}>
                        {previousPage? previousPage + " . " : ""}
                    </a>
                    <a>
                        {currentPage +1 -1 }
                    </a> .
                    <a href="#" onClick={() => {this.props.setPagination(nextPage, nextPage*6, nextPage*6 + 6)}}>
                        {nextPage < numberOfPages ? nextPage : ""} .
                    </a>
                    <a href="#" onClick={() => {this.props.setPagination(secondNextPage, secondNextPage*6, secondNextPage*6 + 6)}}>
                        {secondNextPage < numberOfPages ? secondNextPage : ""}
                    </a>
                    <a href="#" onClick={() => {this.props.setPagination(numberOfPages, numberOfPages*6, numberOfPages*6 + 6)}}>
                        {numberOfPages > currentPage? " ... " + numberOfPages : ""}
                    </a>

                    <a href="#" onClick={() => {this.props.setPagination(nextPage, nextPage*6, nextPage*6 + 6)}}>
                        {nextPage < numberOfPages ? " Next Page " : ""}
                    </a>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = state => ({})
//
// const mapDispatchToProps = {}
//
// export default connect(mapStateToProps, mapDispatchToProps)(Menu)
