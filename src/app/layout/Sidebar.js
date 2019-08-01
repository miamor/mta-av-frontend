import React, {Component} from 'react'

class Sidebar extends Component{

    state = {
        selected: 'dashboard'
    }


    render(){

        const selectedStyle = {borderLeft: '5px solid #e600e6', backgroundColor: '#311b31'}
        const {selected} = this.state

        return(
            <div className='Sidebar'>
                <div className='Title'>mtaAV Antivirus</div>
                <div className='Menu'>
                    <div 
                        className='Item' 
                        style={selected === 'home' ? selectedStyle : null}
                        onClick={() => this.setState({selected: 'home'})}>
                        <i className="fas fa-home"></i>
                        Home
                    </div>
                    <div 
                        className='Item' 
                        style={selected === 'dashboard' ? selectedStyle : null}
                        onClick={() => this.setState({selected: 'dashboard'})}>
                        <i className="fas fa-chart-bar"></i>
                        Dashboard
                    </div>
                    <div 
                        className='Item'
                        style={selected === 'scan' ? selectedStyle : null}
                        onClick={() => this.setState({selected: 'scan'})}>
                        <i className="fab fa-stumbleupon-circle"></i>
                        Scan
                    </div>
                    <div 
                        className='Item'
                        style={selected === 'about' ? selectedStyle : null}
                        onClick={() => this.setState({selected: 'about'})}>
                        <i className="fas fa-user-friends"></i>
                        About Us
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar