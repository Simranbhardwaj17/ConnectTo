import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => (        //alerts r now a prop
  <div className="alert-wrapper">
    {alerts.map((alert) => (            // ret our JSX      //for this div we need a key, whenever u map through an arr like this & o/p jsx it's a list & u need to have a unique key
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>     
        {alert.msg}    
      </div>
    ))}
  </div>
);

Alert.propTypes = { 
  alerts: PropTypes.array.isRequired
};

//In this case we want to get the alert state what we saw in the Redux-DevTool that array we wanna fetch that into this compo.so create a var cld  "mapStateToProps"
const mapStateToProps = (state) => ({     //As the name, we r mapping redux state to a prop in this compo so that we have access to it, in this case it gonna be array of alerts
  alerts: state.alert           //arrow fn takes state as a param         to get state inside alert(reducer) do "state.alert"
});

export default connect(mapStateToProps)(Alert);   //at end component name

//dynamic, use a template string var here, it shown as alert-danger in css(ln: 8)