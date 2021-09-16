import { Component } from 'react';
import MyContext from './MyContext';

class MyProvider extends Component{
    state = {
        authenticated: false
    }

    render(){
        return(
            <MyContext.Provider
                value={{
                    authenticated: this.state.authenticated,
                    authenticateUser: () =>{
                        this.setState({
                            authenticated: true
                        })
                    }
                }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export default MyProvider;