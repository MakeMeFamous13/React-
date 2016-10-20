'use strict';

import React from 'react';

export default class CanvasPlayer extends React.Component {

    componentDidMount() {
        var canvas, stage, exportRoot;
        var that = this;
        var currentLib = window.completeLib[this.props.resource.animationFile];

        var init = () => {
            canvas = this.refs.canvas;
            window.images = window.images||{};
            window.ss = window.ss||{};

            var loader = new createjs.LoadQueue(false);
            loader.addEventListener("fileload", handleFileLoad);
            loader.addEventListener("complete", handleComplete);

            if ( !! that.props.resource.jsonFile) {
                // To load JSON file
                loader.loadFile({src:that.props.resource.jsonFile, type:"spritesheet", id:that.props.resource.canvasId}, true);
            }

            loader.loadManifest(currentLib.properties.manifest);
        };

        function handleFileLoad(evt) {
            if (evt.item.type == "image") { window.images[evt.item.id] = evt.result; }
        }

        function handleComplete(evt) {
            if ( !! that.props.resource.canvasId) {
                var queue = evt.target;
                window.ss[that.props.resource.canvasId] = queue.getResult(that.props.resource.canvasId);
            }

            exportRoot = new currentLib[that.props.resource.animationFunction]();

            stage = new createjs.Stage(canvas);
            stage.addChild(exportRoot);
            stage.update();

            that.canvasStage = stage;

            createjs.Ticker.setFPS(currentLib.properties.fps);
            createjs.Ticker.addEventListener("tick", stage);
        }

        init();
    }

    componentWillUnmount() {
        if ( !! this.canvasStage) {
            this.canvasStage.clear();
        }

        createjs.Ticker.removeAllEventListeners('tick');
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <canvas
            ref="canvas"
            width={this.props.width}
            height={this.props.height}
        ></canvas>;
    }

}