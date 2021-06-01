import React, { useState } from 'react'

function WelcomeDialog() {
    const Title = (props) => {
        return <h1>this is {props.text} the color is </h1>
    }
    const FancyBorder = (props) => {
        return (
            <div className={'FancyBorder FancyBorder-' + props.color}>
                {props.children}
            </div>
        );
    }
    return (
        <FancyBorder color="blue">
            <Title text={'text'} />
        </FancyBorder>
    );
}

export default WelcomeDialog;