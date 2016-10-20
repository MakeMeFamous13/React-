'use strict';

import React from 'react';
import store from '../../store';
import keyboard from '../../keyboardEvents';

class InstructionRemote extends React.Component {
    componentDidMount() {
        let { remoteSub, remoteEnter, remoteStep1, remoteStep2, remoteStep3, remoteScreen, remoteGif, remoteProector, remoteHand, remoteControllerWr, remoteController } = this.refs;

        var tlRemote = new TimelineLite({onComplete: remoteHandMove})
        .from(remoteControllerWr, 1, {x:400, opacity:0}, "remoteTitle")
        .from(remoteController, 1, {x:400, opacity:0}, "remoteTitle+=0.25")
        .from(remoteProector, 1, {opacity:0},"remoteProector")
        .from(remoteScreen, 2, {opacity:0}, "remoteProector+=0.25")
        .from(remoteGif, 0.5, {opacity:0}, "remoteProector+=1.5")
        //.from(remoteSub, 0.5, {opacity:0}, "remoteSub")
        .from(remoteEnter, 0.5, {opacity:0})
        .from(remoteHand, 1, {opacity:0, x:500}, "remoteHand")
        .from([remoteStep1, remoteStep2, remoteStep3], 0.5, {opacity:0, x:100}, "remoteHand")
        //.from(remoteStep2, 0.5, {opacity:0, x:100, delay:1.2})
        //.from(remoteStep3, 0.5, {opacity:0, x:100, delay:1.5});

        function remoteHandMove() {
            var timerId = setTimeout(function handMove() {
                TweenMax.to(remoteHand, 1.3, {x:-10, y:-10, yoyo:true, repeat:1});
                timerId = setTimeout(handMove, 8000);
            }, 0);
        }

        this.keyboardEvents = keyboard.keydown({
            back: () => {
                store.dispatch({
                    type: 'POPUP_HIDE'
                });
            }
        });
    }

    componentWillUnmount() {
        this.keyboardEvents();
    }

    render() {
        return <div className="wrapper-remote">
            <div className="tutorblock">
                <div className="tutorblock-description" id="remote-sub" ref="remoteSub">Функціональне призначення кнопки «Виконати»</div>
                <div className="tutorblock-description-details">
                    <div ><img src="/img/enter-red.png" alt="" className="" id="remote-enter" ref="remoteEnter"/></div>
                    <div>
                        <ul>
                            <li id="remote-step-1" ref="remoteStep1">Перейти на інший виділений розділ</li>
                            <li id="remote-step-2" ref="remoteStep2">Увімкнути або вимкнути виділений блок</li>
                            <li id="remote-step-3" ref="remoteStep3">Прийняти рішення</li>
                        </ul>
                    </div>
                </div>
                <div className="tutorblock-screen" id="remote-screen" ref="remoteScreen">
                    <div className="tutorblock-screen-body">
                        <img src="/img/remote_3.gif" alt="" id="remote-gif" ref="remoteGif"/>
                    </div>
                </div>
                <img src="/img/tutor-proector.gif" alt="" className="tutorblock-proector" id="remote-proector" ref="remoteProector"/>
                <img src="/img/hand-remote.png" alt="" className="tutorblock-hand hidden" id="remote-hand" ref="remoteHand"/>
            </div>
            
            <div className="wrapper-remote-unit" id="remote-controller-wr" ref="remoteControllerWr">
                <div className="remoteblock" id="remote-controller" ref="remoteController">
                    {/*<div className="remote-color"></div>
                    <div className="remote-light"></div>
                    <div className="remote-scroll"></div>
                    <img src="/img/remote-body.png" alt="" className="remote-body"/>
                    <img src="/img/control-inactive.png" alt="" className="control-inactive"/>
                    <div className="remoteblock-cross"></div>
                    <div className="remote-home"></div>
                    <div className="remote-enter remote-enter-active"></div>
                    <div className="remote-return"></div>
                    <div className="remote-volume"></div>*/}
                    <img src="/img/remote-full.png" className="remote-body"/>
                </div>
            </div>
        </div>;
    }
}

export default InstructionRemote;