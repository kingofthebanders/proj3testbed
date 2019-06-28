import React, { Component } from 'react';
import BasicLayout from '../components/BasicLayout';
import LocalStorageLayout from '../components/LocalStorage';
import NoCompactingLayout from '../components/FreeMovement'

class Layout extends Component {
    state = {  }
    render() { 
        return ( 

            <div className="container">
                <div class="row mt-5">
                    <div class="col-md-4">
                    </div>
                    <div id="testId" className="col-md-4 mt-5" >
                       {/* <BasicLayout /> */}
                       <LocalStorageLayout />
                       {/* <NoCompactingLayout /> */}
                    </div>
                </div>

            </div>
         );
    }
}
 
export default Layout;

// 