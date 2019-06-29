import React, { Component } from 'react';
import BasicLayout from '../components/BasicLayout';
// import LocalStorageLayout from '../components/LocalStorage';
import LocalStorageLayout from '../components/LocalStorageOriginal';
import NoCompactingLayout from '../components/FreeMovement'
import ResponsiveLocalStorageLayout from '../components/LocalStorageResponsive';

class Layout extends Component {
    state = {  }
    render() { 
        return ( 

            <div className="container">
                <div class="row mt-5">

                    <div id="testId" className="col-md-12 mt-5" >
                       {/* <BasicLayout /> */}
                       <LocalStorageLayout />
                       {/* <NoCompactingLayout /> */}
                       {/* <ResponsiveLocalStorageLayout /> */}
                    </div>
                </div>

            </div>
         );
    }
}
 
export default Layout;

// 