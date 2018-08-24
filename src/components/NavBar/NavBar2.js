import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserPic from './components/UserPic'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Fork from './components/Fork';
import Save from './components/Save'

class NavBar2 extends Component {
  constructor(){
    super()
    this.state={
      user: '',
      pen:'',
      input: 'Untitled Pen'
    }
  }

  componentDidMount(){
    axios.get('/api/users').then(res => {
      this.setState({
        user:res.data
      })
    })
  }

  componentChange(){
    if(this.props.match.path !== '/editor'){
      return(
        <Fork/>
      )
    }else if(this.props.match.path === '/editor'){
      return(
        <Save/>
      )
    }
    
  }

  titleChanger(){
    return(
      <div className='titleChng'>
      <input type='text' className='titleInput' placeholder={this.state.input}/>
      <img src="https://vignette.wikia.nocookie.net/freestyle2/images/7/79/Icon_edit.png/revision/latest?cb=20160907075220" alt="" className='penIcon' onClick={() => this.changeTitle()}/>
      </div>
    )
  }

  changeTitle(){
    this.setState({
      input:''
    })
  }
  
  
  render() {
    return (
      <div>
      {/* <input type={this.state.input} className='titleInput'/> */}
        <div className='Nav'>
          <nav className='nav1'>

            <div className='Name2'>
              <img className='icon2' src='http://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png' alt='' />
              <div className='title'>
                {this.titleChanger()}
                <p className='APenBy'>A PEN BY 
                 <Link to='/profile' className='link'><span className='userName'>{this.state.user.username}</span></Link></p>
              </div>

            </div>



            <div className='nav2'>

             {this.componentChange()}

              <div className='SettingsBox'>
                <img className='settGear' src="https://cdn2.iconfinder.com/data/icons/web/512/Cog-512.png" alt=""/>
                <p>Settings</p>

              </div>
              
              <div>
                <UserPic/>
              </div>



            </div>




          </nav>
        </div>
      </div>
    )
  }
}

export default withRouter(NavBar2)