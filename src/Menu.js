import React from 'react'
import { connect } from 'react-redux'

export const Menu = (props) => {
  return (
    <div>
      <h1 className="title">Menu</h1>
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
