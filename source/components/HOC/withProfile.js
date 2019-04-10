// Core
import React, { createContext, Component } from 'react';

const { Provider, Consumer } = createContext();

const withProfile = (Enhanceble) => {
    return class WithProfile extends Component {
        render () {
            return (
                <Consumer>
                    { (context) => (
                        <Enhanceble
                            { ...context }
                            { ...this.props }
                        />
                    ) }
                </Consumer>
            );
        }
    };
};

export { Provider, Consumer, withProfile };
